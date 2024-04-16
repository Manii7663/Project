{{
    config(
        tag=['staging']
    )
}}

WITH staged_coes AS (
    SELECT
        CAST(_ID AS VARCHAR(255)) AS id,
        CAST(COENAME AS VARCHAR(255)) AS coeName,
        CAST(DESCRIPTION AS VARCHAR(4000)) AS DESCRIPTION,
        COEHEAD as coeHead
    FROM
         {{source('TrainingManagement','coes')}}
)

SELECT * FROM staged_coes
