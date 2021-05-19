#May 9 there are no written comments for clarity put on May 17
WITH T1 AS (
SELECT *
FROM COMMENTS 
WHERE CREATED_AT = '2021-05-17'
)
SELECT U.USERNAME, COUNT(*) AS 'count comments'
FROM USER AS U
JOIN T1 AS C ON U.USER_ID = C.USER_ID
GROUP BY U.USERNAME ;
