SELECT *
FROM BLOCKED
WHERE BLOCKED_DATE BETWEEN $1 AND $2;

-- WHERE BLOCKED_DATE = '2019-05-28';
-- PASS IN AS A STRING IN FORMAT ABOVE