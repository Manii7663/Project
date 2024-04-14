{{ config(
    tags=['intermediate']
) }}

-- Select necessary fields from the stg_training_programs table
WITH transformed_training_programs_fields AS (
    SELECT
        ID AS id,
        PROGRAMID AS programId,
        PROGRAMNAME AS programName,
        CREATEDBY AS createdBy,
        COE AS coeId,
        REGEXP_COUNT(trainerId, ',') + 1 AS totalTrainers
    FROM
        {{ ref('stg_training_programs') }}
),

-- Join with stg_coes table to fetch COE name
joined_with_coe AS (
    SELECT
        ttpf.id,
        ttpf.programId,
        ttpf.programName,

        ttpf.createdBy,
        ttpf.totalTrainers,
        coe.COENAME AS coeName
    FROM
        transformed_training_programs_fields ttpf
    LEFT JOIN
        {{ ref('stg_coes') }} coe
    ON
        ttpf.coeId = coe.id
),

-- Join with stg_users table to fetch the name of the creator
joined_with_user AS (
    SELECT
        jwc.id,
        jwc.programId,
        jwc.programName,
        jwc.totalTrainers,
        u.NAME AS createdByName,
        jwc.coeName
    FROM
        joined_with_coe jwc
    LEFT JOIN
        {{ ref('stg_users') }} u
    ON
        jwc.createdBy = u.ID
)

-- Final select from the last CTE
SELECT *
FROM joined_with_user
