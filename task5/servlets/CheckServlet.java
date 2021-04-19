import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/check")
public class CheckServlet extends HttpServlet {
    private static final String TEXT = "{\"success\" : true}";
    private static final String CONTENT_TYPE = "application/json";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        PrintWriter pw = response.getWriter();
        response.setContentType(CONTENT_TYPE);
        pw.println(TEXT);
        pw.flush();
    }
}




