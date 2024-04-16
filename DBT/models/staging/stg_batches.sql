{{ config(
    tags=['staging']
) }}

WITH transformed_batches AS (
    SELECT
        CAST(BATCHID AS INT) AS batchId,
        batchName::VARCHAR As batchName,
        STARTDATE::DATE AS startDate,
        ENDDATE::DATE AS endDate,
        DESCRIPTION::VARCHAR AS description
    FROM
        {{ source('TrainingManagement', 'batches') }}
)

SELECT *
FROM transformed_batches
