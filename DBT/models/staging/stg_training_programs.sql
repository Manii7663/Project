{{ config(
    tag=['staging']
) }}

WITH transformed_training_programs AS (
    SELECT
        _ID::VARCHAR AS id,
        CAST(PROGRAMID AS INT) AS programId,
        PROGRAMNAME::VARCHAR AS programName,
        DESCRIPTION::VARCHAR AS description,
        CREATEDBY::VARCHAR AS createdBy,
        COE::VARCHAR AS coe,
        TRAINERID::VARIANT AS trainerId 
    FROM
         {{ source('TrainingManagement', 'trainingprograms') }}
)

SELECT *
FROM transformed_training_programs
