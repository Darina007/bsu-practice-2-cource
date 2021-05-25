import com.google.gson.JsonObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet("/post/edit")
public class EditPostServlet extends HttpServlet implements jsonParser, postParser {
    private static final Logger log = Logger.getLogger(EditPostServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String json = null;
        try {
            json = getStringRequest(request);
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
        JsonObject obj = parseStringToJsonObj(json);
        Post post = fillEditFields(obj);
        response.setContentType(ConstantDictionary.CONTENT_TYPE);
        if (PostContainer.editPost(post.getId(), post)) {
            response.setStatus(200);
        } else {
            response.setStatus(501);
        }
    }

    private Post fillEditFields(JsonObject object) {
        Post post = null;
        try {
            post = parsePostFields(object);
        } catch (ParseException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
        return post;
    }

    @Override
    public Post parsePostFields(JsonObject object) throws ParseException {
        return Post.builder()
                .id(parseId(object))
                .description(parseDescription(object))
                .validateUntil(parseValidDate(object))
                .hashTags(parseHashTah(object))
                .discount(parseDiscount(object))
                .build();
    }
}