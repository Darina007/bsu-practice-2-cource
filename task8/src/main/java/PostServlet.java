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
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet("/posts")
public class PostServlet extends HttpServlet {
    private PostCollection posts = new PostCollection(TestPosts.testPosts);
    private static Logger log = Logger.getLogger(PostServlet.class.getName());

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String sID = request.getQueryString();
        sID = sID.substring(3);
        Post post = posts.getPost(sID);
        response.setContentType(ConstantDictionary.CONTENT_TYPE);
        response.setCharacterEncoding(ConstantDictionary.CHARACTER_ENCODING);
        if (post != null) {
            response.getWriter().write(post.toString());
        } else {
            response.getWriter().write(ConstantDictionary.RESULT_NOT_FOUND);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
        String sID = request.getQueryString();
        sID = sID.substring(3);
        response.setContentType(ConstantDictionary.CONTENT_TYPE);
        response.setCharacterEncoding(ConstantDictionary.CHARACTER_ENCODING);
        try {
            if (posts.removePost(sID)) {
                response.getWriter().write(ConstantDictionary.DELETE_POST_TEXT + sID);
                response.getWriter().write(ConstantDictionary.RESULT_SUCCESS);
            } else {
                response.getWriter().write(ConstantDictionary.RESULT_NOT_FOUND);
            }
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        Post post = createPost(request);
        response.setContentType(ConstantDictionary.CONTENT_TYPE);
        response.setCharacterEncoding(ConstantDictionary.CHARACTER_ENCODING);
        try {
            response.getWriter().write(post.toString());
            if (posts.addPost(post)) {
                response.getWriter().write(ConstantDictionary.RESULT_SUCCESS);
            } else {
                response.getWriter().write(ConstantDictionary.RESULT_INVALID);
            }
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
    }

    private Post createPost(HttpServletRequest request) {
        String author = request.getParameter(ConstantDictionary.KEY_AUTHOR);
        String description = request.getParameter(ConstantDictionary.KEY_DESCRIPTION);
        Date creationDate = setCreationDate(request);
        Date validateUntil = setValidationDate(request);
        String photoLink = request.getParameter(ConstantDictionary.KEY_PHOTO_LINK);
        List<String> hashTags = Collections.singletonList(request.getParameter(ConstantDictionary.KEY_HASHTAG));
        int discount = Integer.parseInt(request.getParameter(ConstantDictionary.KEY_DISCOUNT));
        return Post.builder()
                .author(author)
                .description(description)
                .creationDate(creationDate)
                .validateUntil(validateUntil)
                .photoLink(photoLink)
                .hashTags(hashTags)
                .discount(discount)
                .likes(null)
                .id(Post.generateID())
                .build();
    }

    private Date setCreationDate(HttpServletRequest request) {
        Date creationDate = null;
        try {
            creationDate = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN).parse(request.getParameter(ConstantDictionary.KEY_CREATION_DATE));
        } catch (ParseException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
        return creationDate;
    }
    private Date setValidationDate(HttpServletRequest request) {
        Date validateUntil = null;
        try {
            validateUntil = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN).parse(request.getParameter(ConstantDictionary.KEY_VALIDATE_UNTIL));
        } catch (ParseException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
        return validateUntil;
    }
}
