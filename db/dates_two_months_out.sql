SELECT 'STO' as from_table, START_DATE, END_DATE, EMPLOYEE_ID, INITIALS 
FROM STO
LEFT JOIN EMPLOYEE ON STO.EMPLOYEE_ID = EMPLOYEE.ID
WHERE  (extract(month from start_date) = extract(month from (CURRENT_DATE + INTERVAL '2 month'))
  OR extract(month from end_date) = extract(month from (CURRENT_DATE + INTERVAL '2 month')))
  AND extract(year from start_date) = extract(year from (CURRENT_DATE + INTERVAL '2 month'))
  AND EMPLOYEE.INACTIVE = false

UNION ALL
SELECT 'BLOCKED' as from_table, BLOCKED_DATE AS START, BLOCKED_DATE, ID, COMMENT 
FROM BLOCKED
WHERE  extract(month from blocked_date) = extract(month from (CURRENT_DATE + INTERVAL '2 month'))
  AND extract(year from blocked_date) = extract(year from (CURRENT_DATE + INTERVAL '2 month'))

UNION ALL
SELECT 'EVENT' as from_table, EVENT_DATE AS START, EVENT_DATE, ID, COMMENT FROM EVENT
WHERE  extract(month from event_date) = extract(month from (CURRENT_DATE + INTERVAL '2 month'))
  AND extract(year from event_date) = extract(year from (CURRENT_DATE + INTERVAL '2 month'))


ORDER BY START_DATE 