{{ config(
    tags=['mart']
) }}

-- models/session_status_percentage.sql

WITH session_counts AS (
    SELECT
        PROGRAMNAME,
        STARTDATE,
        ENDDATE,
        STARTTIME,
        ENDTIME,
        VENUE,
        COENAME as coe,
        SUM(CASE WHEN STATUS = 'completed' THEN 1 ELSE 0 END) AS completed_count,
        SUM(CASE WHEN STATUS = 'pending' THEN 1 ELSE 0 END) AS pending_count
    FROM {{ ref('int_training_sessions') }}
    GROUP BY PROGRAMNAME, STARTDATE, ENDDATE, STARTTIME, ENDTIME, VENUE,coe
),
total_trainee_counts AS (
    SELECT
        PROGRAMNAME,
        STARTDATE,
        ENDDATE,
        STARTTIME,
        ENDTIME,
        VENUE,
        COENAME as coe,
        COUNT(*) AS total_trainee
    FROM {{ ref('int_training_sessions') }}
    GROUP BY PROGRAMNAME, STARTDATE, ENDDATE, STARTTIME, ENDTIME, VENUE,coe
),
completion_counts AS (
    SELECT
        sc.PROGRAMNAME,
        sc.STARTDATE,
        sc.ENDDATE,
        sc.STARTTIME,
        sc.ENDTIME,
        sc.VENUE,
        sc.completed_count,
        sc.pending_count,
        sc.coe,
        ttc.total_trainee,
        (sc.completed_count / ttc.total_trainee) * 100 AS completion_percentage,
        (sc.pending_count / ttc.total_trainee) * 100 AS pending_percentage
    FROM
        session_counts sc
    JOIN
        total_trainee_counts ttc
    ON
        sc.PROGRAMNAME = ttc.PROGRAMNAME
        AND sc.STARTDATE = ttc.STARTDATE
        AND sc.ENDDATE = ttc.ENDDATE
        AND sc.STARTTIME = ttc.STARTTIME
        AND sc.ENDTIME = ttc.ENDTIME
        AND sc.VENUE = ttc.VENUE
        AND sc.coe = ttc.coe
),
final_data as (
    SELECT
    sc.PROGRAMNAME,
    sc.coe,
    sc.STARTDATE,
    sc.ENDDATE,
    sc.STARTTIME,
    sc.ENDTIME,
    sc.VENUE,
    sc.completed_count,
    sc.pending_count,
    cc.total_trainee,
    cast(cc.completion_percentage as INTEGER) as completion_percentage,
    cast(cc.pending_percentage as INTEGER) as pending_percentage
FROM
    session_counts sc
JOIN
    completion_counts cc
ON
    sc.PROGRAMNAME = cc.PROGRAMNAME
    AND sc.STARTDATE = cc.STARTDATE
    AND sc.ENDDATE = cc.ENDDATE
    AND sc.STARTTIME = cc.STARTTIME
    AND sc.ENDTIME = cc.ENDTIME
    AND sc.VENUE = cc.VENUE
    AND sc.coE = cc.coe

)

SELECT * from final_data
