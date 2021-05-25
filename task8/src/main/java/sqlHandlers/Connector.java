package sqlHandlers;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Connector {
    private static final String URL = "jdbc:mysql://localhost:3306/usersdb?serverTimezone=UTC";
    private static final String NAME = "root";
    private static final String PASSWORD = "lilo244";
    public static Connection connection;
    private static boolean flag = false;
    private static final Logger log = Logger.getLogger(Connector.class.getName());


    public static void connect() {
        if (!isConnected()) {
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
                Connector.connection = java.sql.DriverManager.getConnection(Connector.URL, Connector.NAME, Connector.PASSWORD);
                Connector.flag = true;
                log.log(Level.SEVERE, "Connected");
            } catch (ClassNotFoundException | SQLException e) {
                log.log(Level.SEVERE, "Exception: ", e);
            }
        }
    }

    public static void closeConnection() {
        if (isConnected()) {
            try {
                Connector.connection.close();
                Connector.flag = false;
            } catch (SQLException throwable) {
                log.log(Level.SEVERE, "Exception: ", throwable);
            }
        }
    }

    public static boolean isConnected() {
        return Connector.flag;
    }
}
