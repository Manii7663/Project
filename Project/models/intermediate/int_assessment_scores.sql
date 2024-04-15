WITH assessment_scores_raw AS (
    SELECT
        SESSIONID AS sessionId,
        traineeId ,
        ASSESSMENTDATE::DATE AS assessmentDate,
        SCORE,
        MAXSCORE AS maxScore
    FROM
        {{ ref('stg_assessment_scores') }}
),

training_session_info AS (
    SELECT
        sessionId,
        programName,
        coeName as coe
    FROM
        {{ ref('int_training_sessions') }}
),
user_information AS (
    SELECT
        a.*,
        u.NAME AS traineeName
    FROM
        assessment_scores_raw a
    JOIN
        {{ ref('stg_users') }} u ON a.traineeId = u.ID
)

SELECT
    a.sessionId,
    a.traineeName,
    a.assessmentDate,
    a.score,
    a.traineeId,
    a.maxScore,
    t.programName,
    t.coe
FROM
    user_information a
    right JOIN
    training_session_info t ON a.sessionId = t.sessionId
