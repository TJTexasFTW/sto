SELECT *
FROM EMPLOYEE
WHERE $1 = name 
  OR $2 = initials;