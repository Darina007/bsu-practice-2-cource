package sqlHandlers;

import entities.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public abstract class UserDAO {
    private static final Logger log = Logger.getLogger(UserDAO.class.getName());

    public void addUser(User user) {
        try {
            PreparedStatement preparedStatement = Connector.connection.prepareStatement(SQLHandlers.ADD_USER);
            preparedStatement.setLong(1, user.getUserId());
            preparedStatement.setString(2, user.getUserName());
            preparedStatement.execute();
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
    }

    public static List<User> query(String username) {
        List<User> result = new ArrayList<>();
        try {
            PreparedStatement preparedStatement = Connector.connection.prepareStatement(SQLHandlers.GET_USER_BY_NAME);
            preparedStatement.setString(1, username);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                result.add(User.builder()
                        .userId(resultSet.getLong(SQLHandlers.KEY_USER_ID))
                        .userName(resultSet.getString(SQLHandlers.KEY_USERNAME)).build());
            }
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        return result;
    }

    public static User query(Long userId) {
        User result = null;
        try {
            PreparedStatement preparedStatement = Connector.connection.prepareStatement(SQLHandlers.GET_USER_BY_ID);
            preparedStatement.setLong(1, userId);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                result = User.builder()
                        .userId(resultSet.getLong(SQLHandlers.KEY_USER_ID))
                        .userName(resultSet.getString(SQLHandlers.KEY_USERNAME)).build();
            }
        } catch (SQLException throwable) {
            log.log(Level.SEVERE, "Exception: ", throwable);
        }
        return result;
    }

}
