SELECT *
FROM POST AS P
JOIN (
SELECT POST_ID, AVG(RATING) AS 'avg_rating'
FROM COMMENTS
GROUP BY POST_ID
) AS C 
ON C.POST_ID = P.POST_ID
WHERE avg_rating >= 3;
