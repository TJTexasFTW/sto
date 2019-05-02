UPDATE Employee
SET name = $1, initials = $2, admin = $3, inactive = $4 
WHERE id = $5;