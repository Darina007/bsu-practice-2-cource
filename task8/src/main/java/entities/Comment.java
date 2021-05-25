package entities;

import lombok.Builder;
import sqlHandlers.CommentDAO;

import java.util.Date;
import java.util.logging.Logger;

@Builder
public class Comment extends CommentDAO {
    private final String commentAuthor;
    private final long commentAuthorId;
    private final String commentText;
    private final int commentMark;
    private final Date commentDate;
    private static final int MAX_MARK = 5;
    private static final int MIN_MARK = 1;
    private static Logger log = Logger.getLogger(Comment.class.getName());

    public boolean isValidComment() {
        return isCommentAuthor() && isCommentText()
               && isValidMark() && isCommentDate();
    }

    public long getCommentAuthorId() {
        return commentAuthorId;
    }

    public String getCommentAuthor() {
        return commentAuthor;
    }

    public String getCommentText() {
        return commentText;
    }

    public int getCommentMark() {
        return commentMark;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    private boolean isCommentAuthor() {
        return commentAuthor != null;
    }

    private boolean isCommentText() {
        return commentText != null;
    }

    private boolean isValidMark() {
        return commentMark <= MAX_MARK && commentMark >= MIN_MARK;
    }

    private boolean isCommentDate() {
        return commentDate != null;
    }
}
