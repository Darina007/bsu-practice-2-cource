SELECT CONCAT(DATEDIFF(CURRENT_DATE(), MIN(CREATED_AT)),' days ago') 'first post loaded' 
FROM POST;