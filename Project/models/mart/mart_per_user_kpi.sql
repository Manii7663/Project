
-- Average Score per User
WITH user_Assessment AS (
    SELECT
        traineeName,
        traineeId,
        CAST(AVG(SCORE) AS INTEGER) AS avg_score,
        MAX(SCORE) AS max_score,
        MIN(SCORE) AS min_score,
        COUNT(*) AS assessment_count
    FROM
        {{ ref('int_assessment_scores') }}
    GROUP BY
        traineeId,traineeName
),
 trainings_per_user AS (
    SELECT
        TRAINEEID,
        COUNT(DISTINCT SESSIONID) AS total_sessions
    FROM
        {{ref('int_training_sessions')}}
    GROUP BY
        TRAINEEID
)


Select traineeName,
        ua.traineeId,
        avg_score,
        max_score,
        min_score,
        assessment_count as completed_assessment,
        tps.total_sessions,
        tps.total_sessions-assessment_count as pending_assessment
        from user_Assessment ua
 join trainings_per_user tps
on ua.traineeId=tps.traineeId