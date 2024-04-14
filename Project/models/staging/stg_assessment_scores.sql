{{ config(
   
    tags=['staging']
) }}

WITH transformed_assessment_scores AS (
    SELECT
        _ID::VARCHAR AS id,
        ASSESSMENTSESSIONID::VARCHAR AS SessionId,
        SESSIONNAME::VARCHAR AS sessionName,
        USERID::VARCHAR AS traineeId,
        ASSESSMENTDATE::DATE AS assessmentDate,
        TRY_TO_NUMBER(SCORE) AS score,
        TRY_TO_NUMBER(MAXSCORE) AS maxScore
    FROM
        {{ source('TrainingManagement', 'assessmentscores') }}
)

SELECT *
FROM transformed_assessment_scores
