package sqlHandlers;

import entities.*;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public abstract class PostDAO {
    private static final Logger log = Logger.getLogger(PostDAO.class.getName());

    public static void addPost(Post post) {
        Connector.connect();
        try {
            PreparedStatement preparedStatement = Connector.connection.prepareStatement(SQLHandlers.ADD_POST);
            preparedStatement.setLong(1, post.getUserId());
            preparedStatement.setString(2, post.getDescription());
            preparedStatement.setDate(3, new java.sql.Date(post.getCreatedAt().getTime()));
            preparedStatement.setDate(4, new java.sql.Date(post.getValidateUntil().getTime()));
            preparedStatement.setString(5, post.getPhotoLink());
            preparedStatement.setInt(6, post.getRating());
            preparedStatement.setInt(7, post.getDiscount());
            preparedStatement.setString(8, post.getHashTagsToSQL());
            preparedStatement.execute();
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        Connector.closeConnection();
    }

    public static void removePost(long id) {
        Connector.connect();
        try {
            LikesDAO.removeLikes(id);
            CommentDAO.removeComments(id);
            PreparedStatement statement = Connector.connection.prepareStatement(SQLHandlers.REMOVE_POST);
            statement.setLong(1, id);
            statement.execute();
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        Connector.closeConnection();
    }

    public static void updatePost(Post post) {
        Connector.connect();
        updateDiscount(post);
        updateDescription(post);
        updateHashTags(post);
        updateDateOfValidation(post);
        Connector.closeConnection();
    }

    public static List<Post> query(Filter filter) {
        Connector.connect();
        List<Post> posts = new ArrayList<>();
        try {
            Statement statement = Connector.connection.createStatement();
            String query = createQuery(filter);
            ResultSet result = statement.executeQuery(query);
            posts = parsePosts(result);
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        Connector.closeConnection();
        return posts;
    }

    private static void updateDiscount(Post post) {
        PreparedStatement statement;
        try {
            if (post.isValidDiscount()) {
                statement = Connector.connection.prepareStatement(SQLHandlers.UPDATE_POST + SQLHandlers.UPDATE_DISCOUNT);
                statement.setInt(1, post.getDiscount());
                statement.setLong(2, post.getId());
            }
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
    }

    private static void updateHashTags(Post post) {
        PreparedStatement statement;
        try {
            if (post.isHashTags()) {
                statement = Connector.connection.prepareStatement(SQLHandlers.UPDATE_POST + SQLHandlers.UPDATE_HASH_TAGS);
                statement.setString(1, post.getHashTagsToSQL());
                statement.setLong(2, post.getId());
            }
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
    }

    private static void updateDescription(Post post) {
        PreparedStatement statement;
        try {
            if (post.isDescription()) {
                statement = Connector.connection.prepareStatement(SQLHandlers.UPDATE_POST + SQLHandlers.UPDATE_POST_DESCRIPTION);
                statement.setString(1, post.getDescription());
                statement.setLong(2, post.getId());
            }
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
    }

    private static void updateDateOfValidation(Post post) {
        PreparedStatement statement;
        try {
            if (post.isDateOfValidation()) {
                statement = Connector.connection.prepareStatement(SQLHandlers.UPDATE_POST + SQLHandlers.UPDATE_VALIDATE_UNTIL);
                statement.setDate(1, new java.sql.Date(post.getValidateUntil().getTime()));
                statement.setLong(2, post.getId());
            }
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
    }

    private static List<Post> parsePosts(ResultSet result) {
        List<Post> posts = new ArrayList<>();
        try {
            while (result.next()) {
                User user = UserDAO.query(result.getLong(SQLHandlers.KEY_USER_ID));
                List<Long> likes = LikesDAO.query(result.getLong(SQLHandlers.KEY_POST_ID));
                List<Comment> comments = CommentDAO.query(result.getLong(SQLHandlers.KEY_POST_ID));
                posts.add(Post.builder()
                        .id(result.getLong(SQLHandlers.KEY_POST_ID))
                        .userId(result.getLong(SQLHandlers.KEY_USER_ID))
                        .author(user.getUserName())
                        .description(result.getString(SQLHandlers.KEY_POST_DESCRIPTION))
                        .createdAt(result.getDate(SQLHandlers.KEY_CREATED_AT))
                        .validateUntil(result.getDate(SQLHandlers.KEY_VALIDATE_UNTIL))
                        .photoLink(result.getString(SQLHandlers.KEY_PHOTO_LINK))
                        .likes(likes)
                        .comments(comments)
                        .rating(result.getInt(SQLHandlers.KEY_RATING))
                        .discount(result.getInt(SQLHandlers.KEY_DISCOUNT))
                        .build());
            }
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        return posts;
    }

    private static String createQuery(Filter filter) {
        StringBuilder query = new StringBuilder();
        query.append("SELECT * FROM post ");
        if (!filter.isFilter()) {
            query.append("LIMIT 10;");
            return query.toString();
        }
        query.append("WHERE ");
        if (filter.isAuthor()) {
            query.append(createAuthorQuery(filter.getAuthor()));
            query.append(" AND ");
        }
        if (filter.isCreatedAt()) {
            query.append("CREATED_AT >= ");
            query.append(new java.sql.Date(filter.getCreatedAt().getTime()));
            query.append(" AND ");
        }
        if (filter.isValidateUntil()) {
            query.append("VALIDATE_UNTIL >= ");
            query.append(new java.sql.Date(filter.getValidateUntil().getTime()));
            query.append(" AND ");
        }
        if (filter.isDiscount()) {
            query.append("DISCOUNT >= ");
            query.append(filter.getDiscount());
            query.append(" AND ");
        }
        if (filter.isRating()) {
            query.append("RATING >= ");
            query.append(filter.getRating());
            query.append(" AND ");
        }
        if (filter.isHashtags()) {
            query.append("HASH_TAGS LIKE \'%");
            query.append(filter.getHashtags());
            query.append("%\' AND ");
        }
        query.delete(query.length() - 4, query.length());
        return query.toString();
    }

    private static String createAuthorQuery(String name) {
        List<User> users = UserDAO.query(name);
        if (users == null) {
            return null;
        }
        StringBuilder query = new StringBuilder();
        users.forEach(user -> query.append("USER_ID = ").append(user.getUserId()).append(" OR "));
        query.delete(query.length() - 4, query.length());
        return query.toString();
    }
}
