SELECT EMPLOYEE_ID, SUM(END_DATE - START_DATE +1) AS DAYS
FROM STO
WHERE START_DATE < (CURRENT_DATE+30) AND START_DATE > CURRENT_DATE - 1
GROUP BY EMPLOYEE_ID