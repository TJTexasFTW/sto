SELECT DISTINCT NAME, INITIALS, EMPLOYEE.ID
FROM EMPLOYEE
LEFT JOIN STO
ON EMPLOYEE.ID = STO.EMPLOYEE_ID
WHERE START_DATE >= CURRENT_DATE
ORDER BY NAME;