import os
import pymongo
import snowflake.connector
import pandas as pd



mongo_connection_string =  "mongodb+srv://manii:1234@cluster0.bditt1m.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0"
# Snowflake connection settings
SNOWFLAKE_ACCOUNT = "lx16664.central-india.azure"
SNOWFLAKE_USER = "mani"
SNOWFLAKE_PASSWORD = "Jman@600113"
SNOWFLAKE_DATABASE = "TrainingProject"
SNOWFLAKE_SCHEMA = "PROJECT"
SNOWFLAKE_WAREHOUSE = "COMPUTE_WH"


try:
    # Connect to MongoDB Atlas
    mongo_client = pymongo.MongoClient(mongo_connection_string)
    mongo_db = mongo_client['project']
    
    # Print connection success message
    print("Connected to MongoDB Atlas successfully!")

    # Now, you can perform further operations with mongo_client and mongo_db
except pymongo.errors.ConnectionFailure as e:
    # Print connection failure message
    print(f"Failed to connect to MongoDB Atlas: {e}")


try:
    # Connect to Snowflake using environment variables
    snowflake_conn = snowflake.connector.connect(
    user=SNOWFLAKE_USER,
    password=SNOWFLAKE_PASSWORD,
    account=SNOWFLAKE_ACCOUNT,
    warehouse=SNOWFLAKE_WAREHOUSE,
    database=SNOWFLAKE_DATABASE,
    schema=SNOWFLAKE_SCHEMA
)

    # Print connection success message
    print("Connected to Snowflake successfully!")

    # Now, you can perform further operations with snowflake_conn
except snowflake.connector.errors.DatabaseError as e:
    # Print connection failure message
    print(f"Failed to connect to Snowflake: {e}")





# Create raw_data folder if it doesn't exist
if not os.path.exists("staging_raw_data"):
    os.makedirs("staging_raw_data")

# Iterate over each collection
for collection_name in mongo_db.list_collection_names():
    # Retrieve data from collection
    collection_data = list(mongo_db[collection_name].find())
    
    # Convert data to DataFrame
    df = pd.DataFrame(collection_data)
    
    # Write DataFrame to CSV file
    csv_file_path = f"staging_raw_data/{collection_name}.csv"
    df.to_csv(csv_file_path, index=False)
    print(f"Data from collection '{collection_name}' written to '{csv_file_path}'")

# Close MongoDB connection
mongo_client.close()


def sanitize_name(name):
    # Replace invalid characters with underscores
    return ''.join(c if c.isalnum() else '_' for c in name)
if not os.path.exists("staging_raw_data"):
    print("No data to process. Exiting.")
    exit()

# Iterate over each CSV file in the staging_raw_data folder
for filename in os.listdir("staging_raw_data"):
    if filename.endswith(".csv"):
        # Extract table name from filename (remove .csv extension) and sanitize it
        table_name = sanitize_name(os.path.splitext(filename)[0])
        
        # Read CSV file into DataFrame
        df = pd.read_csv(f"staging_raw_data/{filename}")
        
        # Replace NaN values with empty strings
        df = df.fillna('')
        
        # Convert all data to string
        df = df.astype(str)
        
        # Create table in Snowflake if it doesn't exist
        snowflake_cursor = snowflake_conn.cursor()
        
        # Drop the table if it exists
        snowflake_cursor.execute(f"DROP TABLE IF EXISTS {table_name}")
        
        # Create the table
        create_table_query = f"CREATE TABLE {table_name} ("
        for column in df.columns:
            # Sanitize column names
            safe_column_name = sanitize_name(column)
            create_table_query += f'{safe_column_name} VARCHAR,'
        create_table_query = create_table_query[:-1] + ")"  # Remove trailing comma
        snowflake_cursor.execute(create_table_query)
        
        # Prepare INSERT INTO statement
        insert_query = f"INSERT INTO {table_name} VALUES ({','.join(['%s'] * len(df.columns))})"
        
        # Convert DataFrame to list of tuples (rows)
        rows = [tuple(row) for row in df.itertuples(index=False)]
        
        # Execute bulk insert
        snowflake_cursor.executemany(insert_query, rows)
        snowflake_cursor.close()
        
        print(f"Data from '{filename}' inserted into '{table_name}' table in Snowflake.")

# Commit the transaction
snowflake_conn.commit()

# Close Snowflake connection
snowflake_conn.close()