import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/status")
public class StatusServlet extends HttpServlet {
    private static final String TEXT = "Application Is Running";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        response.setContentType("text/html");
        PrintWriter writer = response.getWriter();

        try {
            writer.println("<h2><font color='red' face='Arial'>" + TEXT + "</font></h2>");
        } finally {
            writer.close();
        }
    }
}