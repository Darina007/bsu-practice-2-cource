import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@WebServlet("/posts")
public class PostServlet extends HttpServlet {
    private PostCollection posts = new PostCollection(TestPosts.testPosts);
    public static final String CONTENT_TYPE = "application/json";
    public static final String CHARACTER_ENCODING = "UTF-8";
    public static final String RESULT_NOT_FOUND = "Not found\n";
    public static final String RESULT_SUCCESS = "\nSuccess\n";
    public static final String RESULT_INVALID = "\nInvalid\n";
    public static final String DELETE_POST_TEXT = "Deleting of post with id: ";
    private static final String KEY_AUTHOR = "author";
    private static final String KEY_DESCRIPTION = "description";
    private static final String KEY_CREATION_DATE = "creationDate";
    private static final String KEY_VALIDATE_UNTIL = "validateUntil";
    private static final String KEY_HASHTAG = "hashTag";
    private static final String KEY_PHOTO_LINK = "photoLink";
    private static final String KEY_DISCOUNT = "discount";
    private static final String DATE_PATTERN = "dd/MM/yyyy";


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String str = request.getQueryString();
        String sID = str.substring(3);
        int id = Integer.parseInt(sID);
        Post post = posts.getPost(id);
        response.setContentType(CONTENT_TYPE);
        response.setCharacterEncoding(CHARACTER_ENCODING);
        if (post != null) {
            response.getWriter().write(post.toString());
        } else {
            response.getWriter().write(RESULT_NOT_FOUND);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String str = request.getQueryString();
        String sID = str.substring(3);
        int id = Integer.parseInt(sID);
        response.setContentType(CONTENT_TYPE);
        response.setCharacterEncoding(CHARACTER_ENCODING);
        if (posts.removePost(id)) {
            response.getWriter().write(DELETE_POST_TEXT + id);
            response.getWriter().write(RESULT_SUCCESS);
        } else {
            response.getWriter().write(RESULT_NOT_FOUND);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String author = request.getParameter(KEY_AUTHOR);
        String description = request.getParameter(KEY_DESCRIPTION);
        Date creationDate = null;
        Date validateUntil = null;
        try {
            creationDate = new SimpleDateFormat(DATE_PATTERN).parse(request.getParameter(KEY_CREATION_DATE));
            validateUntil = new SimpleDateFormat(DATE_PATTERN).parse(request.getParameter(KEY_VALIDATE_UNTIL));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        String photoLink = request.getParameter(KEY_PHOTO_LINK);
        List<String> hashTags = Collections.singletonList(request.getParameter(KEY_HASHTAG));
        int discount = Integer.parseInt(request.getParameter(KEY_DISCOUNT));

        Post post = new Post(author, description, creationDate, validateUntil, photoLink, hashTags, discount);
        response.setContentType(CONTENT_TYPE);
        response.setCharacterEncoding(CHARACTER_ENCODING);
        response.getWriter().write(post.toString());
        if (posts.addPost(post)) {
            response.getWriter().write(RESULT_SUCCESS);
        } else {
            response.getWriter().write(RESULT_INVALID);
        }
    }
}
