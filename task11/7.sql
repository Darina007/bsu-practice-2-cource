SELECT U.USERNAME, CREATED_AT, P.POST_DESCRIPTION
FROM POST AS P
JOIN USER AS U ON P.USER_ID = U.USER_ID
WHERE length(P.POST_DESCRIPTION) > 100;
