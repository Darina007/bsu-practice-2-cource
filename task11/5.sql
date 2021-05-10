#Each registered user is considered both a buyer and a seller.
#Therefore, I made a selection user - rating
SELECT U.USERNAME, AVG(P.RATING) AS 'user raring'
FROM USER AS U 
JOIN POST AS P on P.USER_ID = U.USER_ID
GROUP BY USERNAME;
