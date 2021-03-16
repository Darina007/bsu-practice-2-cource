import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/get")
public class NameServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String name = request.getParameter("name");
        PrintWriter pw = response.getWriter();

        pw.println("<html>");
        if (name.length() <= 100) {
            pw.println("<h1> Name is { " + name + " } </h1>");
        } else {
            pw.println("<h1> Name is too long </h1>");
        }
        pw.println("</html>");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        response.setContentType("application/json");
    }
}
