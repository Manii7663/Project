{{ config(
    tags=['intermediate']
) }}

with batch_info as(
    select batchId, batchName
    from {{ ref('stg_batches') }}
),
total_count as(
    select batchId,count(distinct userId) total
    from {{ ref('stg_users') }}
    GROUP BY batchId
),
final_data as (
    select bi.*,tc.total
    from batch_info bi join total_count tc
    on bi.batchId=tc.batchId
)

select * from final_data