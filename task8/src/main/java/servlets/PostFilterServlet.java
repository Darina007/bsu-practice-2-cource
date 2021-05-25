package servlets;

import entities.*;
import sqlHandlers.PostDAO;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet("/posts/search")
public class PostFilterServlet extends HttpServlet {
    private static Logger log = Logger.getLogger(PostFilterServlet.class.getName());

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        List<Post> result = getFilteredPosts(request);
        response.setContentType(ConstantDictionary.CONTENT_TYPE);
        response.setCharacterEncoding(ConstantDictionary.CHARACTER_ENCODING);
        response.setContentType("application/json");
        try {
            if (result.size() == 0) {
                response.setStatus(404);
                PrintWriter out = response.getWriter();
                out.print(ConstantDictionary.RESULT_NOT_FOUND);
            } else {
                response.setStatus(200);
                PrintWriter out = response.getWriter();
                out.print(PostContainer.toJson(result));
            }
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
    }

    private int setTopParam(HttpServletRequest request) {
        if (request.getParameter(ConstantDictionary.KEY_TOP) != null) {
            return Integer.parseInt(request.getParameter(ConstantDictionary.KEY_TOP));
        }
        return 10;
    }

    private int setSkipParam(HttpServletRequest request) {
        if (request.getParameter(ConstantDictionary.KEY_SKIP) != null) {
            return Integer.parseInt(request.getParameter(ConstantDictionary.KEY_SKIP));
        }
        return 0;
    }

    private void setStringFilterParam(HttpServletRequest request, Filter filter) {
        String author = request.getParameter(ConstantDictionary.KEY_AUTHOR);
        if (author != null) {
            filter.setAuthor(author);
        }
        String hashTag = request.getParameter(ConstantDictionary.KEY_HASHTAG);
        if (hashTag != null) {
            filter.setHashtags(Arrays.asList(hashTag.split(" ")));
        }
    }

    private void setIntegerFilterParam(HttpServletRequest request, Filter filter) {
        if (request.getParameter(ConstantDictionary.KEY_RATING) != null) {
            Integer rating = Integer.parseInt(request.getParameter(ConstantDictionary.KEY_RATING));
            filter.setRating(rating);
        }
        if (request.getParameter(ConstantDictionary.KEY_DISCOUNT) != null) {
            int discount = Integer.parseInt(request.getParameter(ConstantDictionary.KEY_DISCOUNT));
            filter.setDiscount(discount);
        }
    }

    private void setDateFilterParam(HttpServletRequest request, Filter filter) {
        try {
            if (request.getParameter(ConstantDictionary.KEY_CREATION_DATE) != null) {
                Date creationDate = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN).parse(request.getParameter(ConstantDictionary.KEY_CREATION_DATE));
                filter.setCreatedAt(creationDate);
            }
            if (request.getParameter(ConstantDictionary.KEY_VALIDATE_UNTIL) != null) {
                Date validateUntil = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN).parse(request.getParameter(ConstantDictionary.KEY_VALIDATE_UNTIL));
                filter.setValidateUntil(validateUntil);
            }
        } catch (ParseException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
    }

    private List<Post> getFilteredPosts(HttpServletRequest request) {
        int top, skip;
        top = setTopParam(request);
        skip = setSkipParam(request);
        Filter filter = Filter.builder().build();
        setStringFilterParam(request, filter);
        setIntegerFilterParam(request, filter);
        setDateFilterParam(request, filter);
        List<Post> result = PostDAO.query(filter);
        result = PostContainer.getPage(skip, top, result);
        return result;
    }
}