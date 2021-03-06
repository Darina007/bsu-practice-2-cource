SELECT *
FROM POST AS P
JOIN (
SELECT POST_ID, COUNT(*) AS 'count_comments'
FROM COMMENTS
GROUP BY POST_ID
) AS C 
ON C.POST_ID = P.POST_ID
WHERE count_comments >= 2;
