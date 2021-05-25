package servlets;

import entities.*;
import com.google.gson.JsonObject;
import sqlHandlers.LikesDAO;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet("/post/update/like")
public class LikePostServlet extends HttpServlet implements postParser {
    private static final Logger log = Logger.getLogger(LikePostServlet.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String json = null;
        try {
            json = getStringRequest(request);
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
        JsonObject obj = parseStringToJsonObj(json);
        long userId = parseUserId(obj);
        long id = parseId(obj);
        response.setContentType(ConstantDictionary.CONTENT_TYPE);
        Post post = PostContainer.getPost(id);
        if (post == null) {
            response.setStatus(501);
        } else {
            if (post.addLike(userId)) {
                LikesDAO.addLike(id, userId);
            } else {
                LikesDAO.removeLike(id, userId);
            }
            response.setStatus(200);
        }
    }
}