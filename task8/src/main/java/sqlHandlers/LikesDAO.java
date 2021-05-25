package sqlHandlers;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class LikesDAO {
    private static final Logger log = Logger.getLogger(LikesDAO.class.getName());

    public static List<Long> query(long postId) {
        Connector.connect();
        List<Long> likes = new ArrayList<>();
        try {
            PreparedStatement preparedStatement = Connector.connection.prepareStatement(SQLHandlers.ADD_LIKE);
            preparedStatement.setLong(1, postId);
            ResultSet result = preparedStatement.executeQuery();
            likes = parseLikes(result);
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        Connector.closeConnection();
        return likes;
    }

    public static void addLike(long postId, long userId) {
        Connector.connect();
        try {
            PreparedStatement preparedStatement = Connector.connection.prepareStatement(SQLHandlers.ADD_LIKE);
            preparedStatement.setLong(1, postId);
            preparedStatement.setLong(2, userId);
            preparedStatement.execute();
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        Connector.closeConnection();
    }

    public static void removeLikes(long postId) {
        Connector.connect();
        try {
            PreparedStatement preparedStatement = Connector.connection.prepareStatement(SQLHandlers.REMOVE_LIKES);
            preparedStatement.setLong(1, postId);
            preparedStatement.execute();
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        Connector.closeConnection();
    }

    public static void removeLike(long postId, long userId) {
        Connector.connect();
        try {
            PreparedStatement preparedStatement = Connector.connection.prepareStatement(SQLHandlers.REMOVE_LIKE);
            preparedStatement.setLong(1, postId);
            preparedStatement.setLong(2, userId);
            preparedStatement.execute();
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        Connector.closeConnection();
    }

    private static List<Long> parseLikes(ResultSet result) {
        List<Long> likes = new ArrayList<>();
        try {
            while (result.next()) {
                likes.add(result.getLong(SQLHandlers.KEY_USER_ID));
            }
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        return likes;
    }
}
