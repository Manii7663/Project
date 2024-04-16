-- models/program_kpi.sql

WITH program_trainers AS (
    SELECT
        PROGRAMNAME,
        TOTALTRAINERS AS total_trainers
    FROM {{ ref('int_training_programs') }}
),
program_sessions AS (
    SELECT
        PROGRAMNAME,
        COUNT(*) AS total_sessions,
        SUM(TOTAL_HOURS) AS total_hours,
        SUM(TOTAL_DAYS) AS total_days
    FROM {{ ref('mart_session_duration') }}
    GROUP BY PROGRAMNAME
),

program_duration AS (
    SELECT
        pt.PROGRAMNAME,
        pt.total_trainers,
        ps.total_sessions,
        ps.total_hours,
        ps.total_days,
        CAST(ps.total_hours / ps.total_sessions AS INTEGER) AS average_hours_per_session,
        CAST(ps.total_days / ps.total_sessions AS INTEGER) AS average_days_per_session
    FROM
        program_trainers pt
    LEFT JOIN
        program_sessions ps
    ON
        pt.PROGRAMNAME = ps.PROGRAMNAME
),

program_status_percent AS (
    SELECT
        PROGRAMNAME,
        CAST(AVG(COMPLETION_PERCENTAGE) AS INTEGER) AS average_completed_percentage,
        CAST(AVG(PENDING_PERCENTAGE) AS INTEGER) AS average_pending_percentage
    FROM
        {{ ref('mart_session_counts') }}
    GROUP BY
        PROGRAMNAME
),

-- Assessments KPI
assessment_kpi AS (
    SELECT
        PROGRAMNAME,
        CAST(AVG(SCORE) AS INTEGER) AS avg_score,
        CAST(MAX(SCORE) AS INTEGER) AS max_score,
        CAST(MIN(SCORE) AS INTEGER) AS min_score,
        COUNT(*) AS assessment_count
    FROM
        {{ ref('int_assessment_scores')}}
    GROUP BY
        PROGRAMNAME
)

SELECT
    pd.PROGRAMNAME,
    pd.total_trainers,
    pd.total_sessions,
    pd.total_hours,
    pd.total_days,
    pd.average_hours_per_session,
    pd.average_days_per_session,
    psp.average_completed_percentage,
    psp.average_pending_percentage,
    ak.avg_score,
    ak.max_score,
    ak.min_score,
    ak.assessment_count
FROM
    program_duration pd
LEFT JOIN
    program_status_percent psp ON pd.PROGRAMNAME = psp.PROGRAMNAME
LEFT JOIN
    assessment_kpi ak ON pd.PROGRAMNAME = ak.PROGRAMNAME
