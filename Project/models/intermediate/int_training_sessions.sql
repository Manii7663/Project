{{ config(
    tags=['intermediate']
) }}

WITH training_sessions AS (
    SELECT
        sessionId,
        programName,
        startDateTime::DATE AS startDate,
        CASE 
            WHEN TIME(startDateTime) = '00:00:00' THEN '10:00'::TIME
            ELSE CAST(startDateTime AS TIME)
        END AS startTime,

        CASE 
            WHEN TIME(endDateTime) = '00:00:00' THEN '18:00'::TIME
            ELSE CAST(endDateTime AS TIME)
        END AS endTime,

        endDateTime::DATE AS endDate,
        venue,
        traineeId,
        trainers,
        status
    FROM
        {{ ref('stg_training_sessions') }}
),
trainee_information AS (
    SELECT
        ts.*,
        u.NAME AS traineeName
    FROM
        training_sessions ts
    LEFT JOIN
        {{ ref('stg_users') }} u ON ts.traineeId = u.ID
),
 Final_data as (
    SELECT
    sessionId,
    programName,
    traineeId,
    startDate,
    startTime,
    endTime,
    endDate,
    venue,
    traineeName,
    status,
    trainers,
    REGEXP_COUNT(trainers, ',') + 1 AS totalTrainers
FROM
    trainee_information
GROUP BY
    sessionId,
    programName,
    traineeId,
    startDate,
    startTime,
    endTime,
    endDate,
    venue,
    traineeName,
    status,
    trainers
 ),

 coe_info as(
    select distinct programName,coeName
    from {{ ref('int_training_programs') }}
 )

 select sessionId,
    fd.programName,
    traineeId,
    startDate,
    startTime,
    endTime,
    endDate,
    venue,
    traineeName,
    status,
    totalTrainers,
    coeName
 from Final_data fd
 left join coe_info ci
 on fd.programName=ci.programName

