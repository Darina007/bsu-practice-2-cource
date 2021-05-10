#Since the number of posts from users does not exceed three, I took for clarity >= 2
WITH T1 AS (
SELECT *
FROM POST
WHERE VALIDATE_UNTIL >= CURRENT_DATE()
)
SELECT U.USER_ID, U.USERNAME, count(*)'posts number' 
FROM USER AS U 
JOIN T1 AS T on T.USER_ID = U.USER_ID
GROUP BY USERNAME having count(*) >= 2;
