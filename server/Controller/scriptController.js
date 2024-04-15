const { exec } = require('child_process');

exports.runMigrationScript = (req, res) => {
  exec('python ingestion_mongo_snowflake.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing migration script: ${error}`);
      return res.status(500).json({ error: 'Server Error' });
    }
    console.log(`Migration script output: ${stdout}`);
    res.status(200).json({ message: 'Migration script executed successfully' });
  });
};
