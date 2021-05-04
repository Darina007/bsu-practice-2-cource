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
        int top, skip;
        if (request.getParameter(ConstantDictionary.KEY_TOP) != null) {
            top = Integer.parseInt(request.getParameter(ConstantDictionary.KEY_TOP));
        } else {
            top = 10;
        }
        if (request.getParameter(ConstantDictionary.KEY_SKIP) != null) {
            skip = Integer.parseInt(request.getParameter(ConstantDictionary.KEY_SKIP));
        } else {
            skip = 0;
        }

        Map<String, String> stringStringHashMap = new HashMap<>();
        Map<String, Integer> integerFilterConfig = new HashMap<>();
        Map<String, Date> dateFilterConfig = new HashMap<>();

        String author = request.getParameter(ConstantDictionary.KEY_AUTHOR);
        if (author != null) {
            stringStringHashMap.put(ConstantDictionary.KEY_AUTHOR, author);
        }

        try {
            if (request.getParameter(ConstantDictionary.KEY_CREATION_DATE) != null) {
                Date creationDate = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN).parse(request.getParameter(ConstantDictionary.KEY_CREATION_DATE));
                dateFilterConfig.put(ConstantDictionary.KEY_CREATION_DATE, creationDate);
            }
            if (request.getParameter(ConstantDictionary.KEY_VALIDATE_UNTIL) != null) {
                Date validateUntil = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN).parse(request.getParameter(ConstantDictionary.KEY_VALIDATE_UNTIL));
                dateFilterConfig.put(ConstantDictionary.KEY_VALIDATE_UNTIL, validateUntil);
            }
        } catch (ParseException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }

        String hashTag = request.getParameter(ConstantDictionary.KEY_HASHTAG);
        if (hashTag != null) {
            stringStringHashMap.put(ConstantDictionary.KEY_HASHTAG, hashTag);
        }

        if (request.getParameter(ConstantDictionary.KEY_RATING) != null) {
            Integer rating = Integer.parseInt(request.getParameter(ConstantDictionary.KEY_RATING));
            integerFilterConfig.put(ConstantDictionary.KEY_RATING, rating);
        }

        if (request.getParameter(ConstantDictionary.KEY_DISCOUNT) != null) {
            Integer discount = Integer.parseInt(request.getParameter(ConstantDictionary.KEY_DISCOUNT));
            integerFilterConfig.put(ConstantDictionary.KEY_DISCOUNT, discount);
        }

        List<Post> result;
        result = posts.getPage(skip, top, stringStringHashMap);
        PostCollection filteredByStringParameters = new PostCollection(result);
        result = filteredByStringParameters.getPage(skip, top, integerFilterConfig);
        PostCollection filteredByIntegerParameters = new PostCollection(result);
        result = filteredByIntegerParameters.getPage(skip, top, dateFilterConfig);

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
}
