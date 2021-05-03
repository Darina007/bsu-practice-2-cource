USE usersdb;

#There are no posts 2021-03-01, I took for clarity 2021-05-17

SELECT U.USER_ID, U.USERNAME, count(*)'posts number' 
FROM USER AS U 
JOIN POST AS P on P.USER_ID = U.USER_ID
WHERE P.CREATED_AT = '2021-05-17'
group by U.USER_ID;
