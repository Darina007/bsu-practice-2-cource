import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/get")
public class NameServlet extends HttpServlet {
    private static final String NAME = "name";
    private static final String VALID_NAME_OUTPUT_1 = "<h1> Name is { ";
    private static final String VALID_NAME_OUTPUT_2 = " } </h1>";
    private static final String INVALID_NAME_OUTPUT = "<h1> Name is too long </h1>";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String name = request.getParameter(NAME);
        PrintWriter pw = response.getWriter();
        if (name.length() <= 100) {
            pw.println(VALID_NAME_OUTPUT_1 + name + VALID_NAME_OUTPUT_2);
        } else {
            pw.println(INVALID_NAME_OUTPUT);
        }
    }
}
