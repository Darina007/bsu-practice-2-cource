import com.google.gson.JsonObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.logging.Level;
import java.util.logging.Logger;


@WebServlet("/post")
public class PostServlet extends HttpServlet implements jsonParser, postParser {
    private PostCollection posts = new PostCollection(TestPosts.testPosts);
    private static Logger log = Logger.getLogger(PostServlet.class.getName());

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
        JsonObject object = requestToJsonObject(request);
        String id = object.get(ConstantDictionary.KEY_ID).getAsString();
        response.setContentType(ConstantDictionary.CONTENT_TYPE);
        response.setCharacterEncoding(ConstantDictionary.CHARACTER_ENCODING);
        try {
            if (posts.removePost(id)) {
                response.setStatus(200);
                response.getWriter().write(ConstantDictionary.DELETE_POST_TEXT + id);
                response.getWriter().write(ConstantDictionary.RESULT_SUCCESS);
            } else {
                response.setStatus(500);
                response.getWriter().write(ConstantDictionary.RESULT_NOT_FOUND);
            }
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String json = null;
        try {
            json = getStringRequest(request);
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
        JsonObject object = parseStringToJsonObj(json);
        Post post = createPost(object);
        response.setContentType(ConstantDictionary.CONTENT_TYPE);
        response.setCharacterEncoding(ConstantDictionary.CHARACTER_ENCODING);
        try {
            response.getWriter().write(post.toString());
            if (posts.addPost(post)) {
                response.setStatus(200);
                response.getWriter().write(ConstantDictionary.RESULT_SUCCESS);
            } else {
                response.setStatus(500);
                response.getWriter().write(ConstantDictionary.RESULT_INVALID);
            }
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
    }

    private Post createPost(JsonObject object) {
        Post post = null;
        try {
            post = parsePostFields(object);
        } catch (ParseException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
        return post;
    }

    private JsonObject requestToJsonObject(HttpServletRequest request) {
        String json = null;
        try {
            json = getStringRequest(request);
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
        return parseStringToJsonObj(json);
    }
}

