package sqlHandlers;

import entities.Comment;
import entities.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public abstract class CommentDAO {
    private static final Logger log = Logger.getLogger(CommentDAO.class.getName());

    public static List<Comment> query(long postId) {
        Connector.connect();
        List<Comment> comments = new ArrayList<>();
        try {
            PreparedStatement preparedStatement = Connector.connection.prepareStatement(SQLHandlers.ADD_LIKE);
            preparedStatement.setLong(1, postId);
            ResultSet result = preparedStatement.executeQuery();
            comments = parseComment(result);
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        Connector.closeConnection();
        return comments;
    }

    public void addComment(long postId, Comment comment) {
        Connector.connect();
        try {
            PreparedStatement preparedStatement = Connector.connection.prepareStatement(SQLHandlers.ADD_COMMENT);
            preparedStatement.setLong(1, postId);
            preparedStatement.setLong(2, comment.getCommentAuthorId());
            preparedStatement.setDate(3, new java.sql.Date(comment.getCommentDate().getTime()));
            preparedStatement.setInt(4, comment.getCommentMark());
            preparedStatement.setString(5, comment.getCommentText());
            preparedStatement.execute();
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        Connector.closeConnection();
    }

    public static void removeComments(long postId) {
        Connector.connect();
        try {
            PreparedStatement preparedStatement = Connector.connection.prepareStatement(SQLHandlers.REMOVE_COMMENTS);
            preparedStatement.setLong(1, postId);
            preparedStatement.execute();
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        Connector.closeConnection();
    }

    private static List<Comment> parseComment(ResultSet result) {
        List<Comment> likes = new ArrayList<>();
        try {
            while (result.next()) {
                User user = UserDAO.query(result.getLong(SQLHandlers.KEY_USER_ID));
                likes.add(Comment.builder()
                        .commentDate(result.getDate(SQLHandlers.KEY_CREATED_AT))
                        .commentAuthor(user.getUserName())
                        .commentAuthorId(result.getLong(SQLHandlers.KEY_USER_ID))
                        .commentMark(result.getInt(SQLHandlers.KEY_RATING))
                        .commentText(result.getString(SQLHandlers.KEY_COMMENT_TEXT))
                        .build());
            }
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        return likes;
    }
}
