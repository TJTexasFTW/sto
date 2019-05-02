SELECT *
FROM employee
WHERE (name = $1
  OR initials = $2)
  AND id <> $3