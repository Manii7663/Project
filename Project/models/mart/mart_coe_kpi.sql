-- models/coe_kpi_with_assessment.sql

WITH coe_programs AS (
    SELECT
        COENAME,
        COUNT(DISTINCT programId) AS program_count,
        SUM(TOTALTRAINERS) AS total_trainers
    FROM {{ ref('int_training_programs') }}
    GROUP BY COENAME
),
coe_sessions AS (
    SELECT
        COENAME,
        COUNT(*) AS total_sessions,
        SUM(TOTAL_HOURS) AS total_hours,
        SUM(TOTAL_DAYS) AS total_days
    FROM {{ ref('mart_session_duration') }}
    GROUP BY COENAME
),
coe_assessment_kpi AS (
    SELECT
        COE,
        CAST(MAX(SCORE) AS INTEGER) AS max_score,
        CAST(AVG(SCORE) AS INTEGER) AS avg_score,
        COUNT(*) AS assessment_count,
        CAST(MIN(SCORE) AS INTEGER) AS min_score
    FROM
        {{ ref('int_assessment_scores')}}
    GROUP BY
        COE
)

SELECT
    cp.COENAME,
    cp.program_count,
    cp.total_trainers,
    cs.total_sessions,
    cs.total_hours,
    cs.total_days,
    cast(cs.total_hours / cs.total_sessions as INTEGER) AS average_hours_per_session,
    cast(cs.total_days / cs.total_sessions as INTEGER) AS average_days_per_session,
    cak.assessment_count AS assessment_count_assessment,
    cak.avg_score AS avg_score_assessment,
    cak.max_score AS max_score_assessment,
    cak.min_score AS min_score_assessment
    
FROM
    coe_programs cp
JOIN
    coe_sessions cs ON cp.COENAME = cs.COENAME
LEFT JOIN
    coe_assessment_kpi cak ON cp.COENAME = cak.COE

