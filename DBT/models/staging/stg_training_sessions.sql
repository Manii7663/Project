
{{ config(
   
    tags=['staging']
) }}

WITH transformed_training_sessions AS (
    SELECT
        _ID::VARCHAR AS sessionId,
        PROGRAMID::VARCHAR AS programId,
        PROGRAMNAME::VARCHAR AS programName,
        TO_TIMESTAMP(STARTDATETIME, 'YYYY-MM-DD HH24:MI:SS.FF6') AS startDateTime,
        TO_TIMESTAMP(ENDDATETIME, 'YYYY-MM-DD HH24:MI:SS.FF6') AS endDateTime,
        VENUE::VARCHAR AS venue,
        TRAINEE::VARCHAR AS traineeId,
        TRAINERS::VARIANT AS trainers,
        STATUS::VARCHAR AS status
    FROM
        {{ source('TrainingManagement', 'trainingsessions') }}
)

SELECT *
FROM transformed_training_sessions