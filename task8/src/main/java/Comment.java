import lombok.Builder;

import java.util.Date;

@Builder
public class Comment {
    private final String author;
    private final String textComment;
    private final int mark;
    private final Date dateOfCreation;
    private static final int MAX_MARK = 5;
    private static final int MIN_MARK = 1;

    public boolean isValidComment() {
        return isAuthor() && isTextComment()
               && isValidMark() && isDateOfCreation();
    }

    private boolean isAuthor() {
        return author != null;
    }

    private boolean isTextComment() {
        return textComment != null;
    }

    private boolean isValidMark() {
        return mark <= MAX_MARK && mark >= MIN_MARK;
    }

    private boolean isDateOfCreation() {
        return dateOfCreation != null;
    }

}
