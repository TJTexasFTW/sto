insert into employee (name, initials, password, admin, inactive, added)
values ($1, $2, $3, $4, false, CURRENT_DATE)
returning id;