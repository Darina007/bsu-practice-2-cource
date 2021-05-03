USE usersdb;

#Since the number of posts from users does not exceed three, I took for clarity >= 2

SELECT U.USER_ID, U.USERNAME, count(*)'posts number' 
FROM USER AS U 
JOIN POST AS P on P.USER_ID = U.USER_ID
group by USERNAME having count(*) >= 2;