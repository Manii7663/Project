{{
    config(
        tag=['staging']
    )
}}

WITH transformed_users AS (
    SELECT
        _ID::VARCHAR AS id,
        ID::VARCHAR AS userId,
        NAME::VARCHAR AS name,
        EMAIL::VARCHAR AS email,
        ROLE::VARCHAR AS role,
        DESIGNATION::VARCHAR AS designation,
        TRY_TO_NUMBER(NULLIF(BATCHID, '')) AS batchId
    FROM
        {{source('TrainingManagement','users')}}
)

SELECT *
FROM transformed_users
