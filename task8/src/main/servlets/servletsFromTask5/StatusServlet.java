package servletsFromTask5;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/status")
public class StatusServlet extends HttpServlet {
    private static final String TEXT = "<h2><font color='red' face='Arial'> Application Is Running </font></h2>";
    private static final String CONTENT_TYPE = "text/html";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        response.setContentType(CONTENT_TYPE);
        PrintWriter writer = response.getWriter();
        try {
            writer.println(TEXT);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}