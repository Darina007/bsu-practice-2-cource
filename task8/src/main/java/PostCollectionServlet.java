import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet("/posts/search")
public class PostCollectionServlet extends HttpServlet {
    private PostCollection posts;
    private static Logger log = Logger.getLogger(PostCollectionServlet.class.getName());
    public PostCollectionServlet() {
        this.posts = new PostCollection(TestPosts.testPosts);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        List<Post> result = getFilteredPosts(request);
        response.setContentType(ConstantDictionary.CONTENT_TYPE);
        response.setCharacterEncoding(ConstantDictionary.CHARACTER_ENCODING);
        try {
            if (result.size() == 0) {
                response.getWriter().write(ConstantDictionary.RESULT_NOT_FOUND);
            } else {
                response.getWriter().write(posts.toString(result));
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

    private Map<String, String> setStringFilterParam(HttpServletRequest request) {
        Map<String, String> stringFilterParam = new HashMap<>();
        String author = request.getParameter(ConstantDictionary.KEY_AUTHOR);
        if (author != null) {
            stringFilterParam.put(ConstantDictionary.KEY_AUTHOR, author);
        }
        String hashTag = request.getParameter(ConstantDictionary.KEY_HASHTAG);
        if (hashTag != null) {
            stringFilterParam.put(ConstantDictionary.KEY_HASHTAG, hashTag);
        }
        return stringFilterParam;
    }

    private Map<String, Integer> setIntegerFilterParam(HttpServletRequest request) {
        Map<String, Integer> integerFilterParam = new HashMap<>();
        if (request.getParameter(ConstantDictionary.KEY_RATING) != null) {
            Integer rating = Integer.parseInt(request.getParameter(ConstantDictionary.KEY_RATING));
            integerFilterParam.put(ConstantDictionary.KEY_RATING, rating);
        }
        if (request.getParameter(ConstantDictionary.KEY_DISCOUNT) != null) {
            Integer discount = Integer.parseInt(request.getParameter(ConstantDictionary.KEY_DISCOUNT));
            integerFilterParam.put(ConstantDictionary.KEY_DISCOUNT, discount);
        }
        return integerFilterParam;
    }

    private Map<String, Date> setDateFilterParam(HttpServletRequest request) {
        Map<String, Date> dateFilterParam = new HashMap<>();
        try {
            if (request.getParameter(ConstantDictionary.KEY_CREATION_DATE) != null) {
                Date creationDate = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN).parse(request.getParameter(ConstantDictionary.KEY_CREATION_DATE));
                dateFilterParam.put(ConstantDictionary.KEY_CREATION_DATE, creationDate);
            }
            if (request.getParameter(ConstantDictionary.KEY_VALIDATE_UNTIL) != null) {
                Date validateUntil = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN).parse(request.getParameter(ConstantDictionary.KEY_VALIDATE_UNTIL));
                dateFilterParam.put(ConstantDictionary.KEY_VALIDATE_UNTIL, validateUntil);
            }
        } catch (ParseException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
        return dateFilterParam;
    }

    private List<Post> getFilteredPosts(HttpServletRequest request) {
        int top, skip;
        top = setTopParam(request);
        skip = setSkipParam(request);
        Map<String, String> stringFilterParam = setStringFilterParam(request);
        Map<String, Integer> integerFilterParam = setIntegerFilterParam(request);
        Map<String, Date> dateFilterConfig = setDateFilterParam(request);
        List<Post> result;
        result = posts.getPage(skip, top, stringFilterParam);
        PostCollection filteredByStringParameters = new PostCollection(result);
        result = filteredByStringParameters.getPage(skip, top, integerFilterParam);
        PostCollection filteredByIntegerParameters = new PostCollection(result);
        result = filteredByIntegerParameters.getPage(skip, top, dateFilterConfig);
        return result;
    }
}