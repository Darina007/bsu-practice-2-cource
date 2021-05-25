package sqlHandlers;

public abstract class SQLHandlers {
    public static final String GET_USER_BY_NAME = "SELECT * FROM user WHERE USERNAME = ?";
    public static final String GET_USER_BY_ID = "SELECT * FROM user WHERE USER_ID = ?";
    public static final String GET_LIKES = "SELECT USER_ID FROM likes WHERE POST_ID = ?";
    public static final String ADD_POST = "INSERT INTO post(USER_ID, POST_DESCRIPTION, CREATED_AT, VALIDATE_UNTIL, PHOTO_LINK, RATING, DISCOUNT, HASH_TAGS) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    public static final String ADD_USER = "INSERT INTO user(USER_ID, USERNAME) VALUES (?, ?);";
    public static final String ADD_LIKE = "INSERT INTO likes(POST_ID, USER_ID) VALUES (?, ?);";
    public static final String ADD_COMMENT = "INSERT INTO comments(POST_ID, USER_ID, CREATED_AT, RATING, COMMENT_TEXT) VALUES (?, ?, ?, ?, ?);";
    public static final String REMOVE_POST = "DELETE FROM post WHERE POST_ID = ?";
    public static final String REMOVE_COMMENTS = "DELETE FROM comments WHERE POST_ID = ?";
    public static final String REMOVE_LIKE = "DELETE FROM likes WHERE POST_ID = ? AND USER_ID = ?";
    public static final String REMOVE_LIKES = "DELETE FROM likes WHERE POST_ID = ?";
    public static final String UPDATE_POST = "UPDATE post SET ";
    public static final String UPDATE_POST_DESCRIPTION = "POST_DESCRIPTION = ? WHERE POST_ID = ?";
    public static final String UPDATE_VALIDATE_UNTIL = "VALIDATE_UNTIL = ? WHERE POST_ID = ?";
    public static final String UPDATE_DISCOUNT = "DISCOUNT = ? WHERE POST_ID = ?";
    public static final String UPDATE_HASH_TAGS = "HASH_TAGS = ? WHERE POST_ID = ?";
    public static final String GET_POST = "SELECT * FROM post ";


    public static final String KEY_USER_ID = "USER_ID";
    public static final String KEY_USERNAME = "USERNAME";
    public static final String KEY_POST_ID = "POST_ID";
    public static final String KEY_POST_DESCRIPTION = "POST_DESCRIPTION";
    public static final String KEY_CREATED_AT = "CREATED_AT";
    public static final String KEY_VALIDATE_UNTIL = "VALIDATE_UNTIL";
    public static final String KEY_PHOTO_LINK = "PHOTO_LINK";
    public static final String KEY_RATING = "RATING";
    public static final String KEY_DISCOUNT = "DISCOUNT";
    public static final String KEY_HASH_TAGS = "HASH_TAGS";
    public static final String KEY_LIKE_ID = "LIKE_ID";
    public static final String KEY_COMMENT_ID = "COMMENT_ID";
    public static final String KEY_COMMENT_TEXT = "COMMENT_TEXT";

}
