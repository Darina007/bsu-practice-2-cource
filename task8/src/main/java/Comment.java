import lombok.Builder;

import java.util.Date;
import java.util.logging.Logger;

@Builder
public class Comment implements postParser{
    private final String commentAuthor;
    private final String commentText;
    private final int commentMark;
    private final Date commentDate;
    private static final int MAX_MARK = 5;
    private static final int MIN_MARK = 1;
    private static Logger log = Logger.getLogger(Comment.class.getName());

    public boolean isValidComment() {
        return getCommentAuthor() && getCommentText()
               && isValidMark() && getCommentDate();
    }

    private boolean getCommentAuthor() {
        return commentAuthor != null;
    }

    private boolean getCommentText() {
        return commentText != null;
    }

    private boolean isValidMark() {
        return commentMark <= MAX_MARK && commentMark >= MIN_MARK;
    }

    private boolean getCommentDate() {
        return commentDate != null;
    }
}
