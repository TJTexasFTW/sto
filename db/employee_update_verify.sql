SELECT *
FROM employee
WHERE (name = $1);
-- returning name, initials, admin, inactive