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

@WebServlet("/posts/search")
public class PostCollectionServlet extends HttpServlet {
    private PostCollection posts;
    public static final String CONTENT_TYPE = "application/json";
    public static final String CHARACTER_ENCODING = "UTF-8";
    public static final String RESULT_NOT_FOUND = "Not found\n";
    private static final String KEY_AUTHOR = "author";
    private static final String KEY_TOP = "top";
    private static final String KEY_SKIP = "skip";
    private static final String KEY_CREATION_DATE = "creationDate";
    private static final String KEY_VALIDATE_UNTIL = "validateUntil";
    private static final String KEY_HASHTAG = "hashTag";
    private static final String KEY_RATING = "rating";
    private static final String KEY_DISCOUNT = "discount";
    private static final String DATE_PATTERN = "dd/MM/yyyy";

    public PostCollectionServlet() {
        this.posts = new PostCollection(TestPosts.testPosts);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int top, skip;
        if (request.getParameter(KEY_TOP) != null) {
            top = Integer.parseInt(request.getParameter(KEY_TOP));
        } else {
            top = 10;
        }
        if (request.getParameter(KEY_SKIP) != null) {
            skip = Integer.parseInt(request.getParameter(KEY_SKIP));
        } else {
            skip = 0;
        }

        Map<String, String> StringFilterConfig = new HashMap<>();
        Map<String, Integer> IntegerFilterConfig = new HashMap<>();
        Map<String, Date> DateFilterConfig = new HashMap<>();

        String author = request.getParameter(KEY_AUTHOR);
        if (author != null) {
            StringFilterConfig.put(KEY_AUTHOR, author);
        }

        try {
            if (request.getParameter(KEY_CREATION_DATE) != null) {
                Date creationDate = new SimpleDateFormat(DATE_PATTERN).parse(request.getParameter(KEY_CREATION_DATE));
                DateFilterConfig.put(KEY_CREATION_DATE, creationDate);
            }
            if (request.getParameter(KEY_VALIDATE_UNTIL) != null) {
                Date validateUntil = new SimpleDateFormat(DATE_PATTERN).parse(request.getParameter(KEY_VALIDATE_UNTIL));
                DateFilterConfig.put(KEY_VALIDATE_UNTIL, validateUntil);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        String hashTag = request.getParameter(KEY_HASHTAG);
        if (hashTag != null) {
            StringFilterConfig.put(KEY_HASHTAG, hashTag);
        }


        if (request.getParameter(KEY_RATING) != null) {
            Integer rating = Integer.parseInt(request.getParameter(KEY_RATING));
            IntegerFilterConfig.put(KEY_RATING, rating);
        }

        if (request.getParameter(KEY_DISCOUNT) != null) {
            Integer discount = Integer.parseInt(request.getParameter(KEY_DISCOUNT));
            IntegerFilterConfig.put(KEY_DISCOUNT, discount);
        }


        List<Post> result;
        result = posts.getPage(skip, top, StringFilterConfig);
        PostCollection filteredByStringParameters = new PostCollection(result);
        result = filteredByStringParameters.getPage(skip, top, IntegerFilterConfig);
        PostCollection filteredByIntegerParameters = new PostCollection(result);
        result = filteredByIntegerParameters.getPage(skip, top, DateFilterConfig);

        response.setContentType(CONTENT_TYPE);
        response.setCharacterEncoding(CHARACTER_ENCODING);
        if (result.size() == 0) {
            response.getWriter().write(RESULT_NOT_FOUND);
        } else {
            response.getWriter().write(posts.toString(result));
        }
    }
}
