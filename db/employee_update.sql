UPDATE Employee
SET name = $1, initials = $2, admin = $3, inactive = $4,
password = CASE WHEN $4 THEN 'INACTIVE' ELSE Password END
WHERE id = $5;