import com.google.gson.JsonObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;


@WebServlet("/post/comment")
public class AddCommentServlet extends HttpServlet implements postParser {
    private static final Logger log = Logger.getLogger(EditPostServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String json = null;
        try {
            json = getStringRequest(request);
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
        JsonObject obj = parseStringToJsonObj(json);
        Comment comment = fillCommentFields(obj);
        String id = obj.get(ConstantDictionary.KEY_ID).getAsString();
        Post post = PostContainer.getPost(id);
        response.setContentType(ConstantDictionary.CONTENT_TYPE);
        if (post.addComment(comment)) {
            response.setStatus(200);
        } else {
            response.setStatus(501);
        }
    }

    private Comment fillCommentFields(JsonObject object) {
        Comment comment = null;
        try {
            comment = parseCommentFields(object);
        } catch (ParseException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
        return comment;
    }

    @Override
    public Comment parseCommentFields(JsonObject object) throws ParseException {
        return Comment.builder()
                .commentAuthor(parseAuthor(object))
                .commentDate(parseCreateDate(object))
                .commentText(parseDescription(object))
                .commentMark(parseRating(object))
                .build();
    }

    @Override
    public String parseAuthor(JsonObject object) {
        return object.get(ConstantDictionary.KEY_COMMENT_AUTHOR).getAsString();
    }

    @Override
    public String parseDescription(JsonObject object) {
        return object.get(ConstantDictionary.KEY_COMMENT_TEXT).getAsString();
    }

    @Override
    public Date parseCreateDate(JsonObject object) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN);
        return format.parse(object.get(ConstantDictionary.KEY_COMMENT_DATE).getAsString());
    }

    @Override
    public int parseRating(JsonObject object) {
        if (object.get(ConstantDictionary.KEY_COMMENT_MARK) == null) {
            return 0;
        }
        return object.get(ConstantDictionary.KEY_COMMENT_MARK).getAsInt();
    }
}