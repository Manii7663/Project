-- models/session_duration.sql

WITH session_timestamps AS (
    SELECT
        SESSIONID,
        PROGRAMNAME,
        STARTDATE,
        STARTTIME,
        ENDDATE,
        ENDTIME,
        COENAME,
        venue
    FROM {{ ref('int_training_sessions') }}
),
session_durations AS (
    SELECT
        SESSIONID,
        PROGRAMNAME,
        STARTDATE,
        STARTTIME,
        ENDDATE,
        ENDTIME,
        COENAME,
        venue,
        DATEDIFF(hour, STARTTIME, ENDTIME) AS total_hours_per_day,
        DATEDIFF(day, STARTDATE, ENDDATE) AS total_days
    FROM session_timestamps
),
total_hours_per_session as (
    SELECT
    SESSIONID,
    PROGRAMNAME,
    total_hours_per_day,
    total_days,
    COENAME,
    venue,
    CASE
        WHEN total_days = 0 THEN total_hours_per_day
        ELSE total_hours_per_day * total_days
    END AS total_hours
FROM session_durations
)

select DISTINCT PROGRAMNAME,COENAME,venue,total_hours_per_day,
    total_days,total_hours from total_hours_per_session

