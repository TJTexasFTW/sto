SELECT NAME, INITIALS, CASE WHEN admin = FALSE THEN 'No' ELSE 'Yes' End AS admin
FROM EMPLOYEE
WHERE INACTIVE = FALSE
ORDER BY NAME

