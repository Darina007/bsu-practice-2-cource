package servletsFromTask5;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.PrintWriter;

@WebFilter(urlPatterns = {"/status"})
public class FilterServlet implements javax.servlet.Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        String method = httpRequest.getMethod();
        long start = System.currentTimeMillis();
        filterChain.doFilter(servletRequest, servletResponse);
        long end = System.currentTimeMillis();
        String path = httpRequest.getRequestURI();
        PrintWriter pw = servletResponse.getWriter();
        pw.println(String.format("%s %s -done (%d ms)", method, path, end - start));
    }
}

