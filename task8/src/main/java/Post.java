import com.google.gson.Gson;
import lombok.Builder;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;

@Builder
public class Post implements postParser {
    private final String id;
    private final String author;
    private String description;
    private final Date createdAt;
    private Date validateUntil;
    private String photoLink;
    private List<String> hashTags;
    private List<String> likes;
    private List<Comment> comments;
    private int rating;
    private int discount;
    private static final int MAX_DISCOUNT = 100;
    private static final int MAX_LENGTH_OF_DESCRIPTION = 100;
    private static final int MIN_DISCOUNT = 100;

    public static String generateID() {
        return UUID.randomUUID().toString();
    }

    public boolean isValid() {
        if (!isAuthor() && !isDescription() &&
            !isDateOfCreation() && !isDateOfValidation()) {
            return false;
        }
        return isValidDiscount() && isValidDescription();
    }

    public boolean isDescription() {
        return description != null;
    }

    public boolean isAuthor() {
        return author != null;
    }

    public boolean isDateOfValidation() {
        return validateUntil != null;
    }

    public boolean isDateOfCreation() {
        return createdAt != null;
    }

    public boolean isValidDescription() {
        return description.length() <= MAX_LENGTH_OF_DESCRIPTION;
    }

    public boolean isValidDiscount() {
        return discount >= MIN_DISCOUNT && discount <= MAX_DISCOUNT;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public String getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }

    public String getDescription() {
        return description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getValidateUntil() {
        return validateUntil;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public List<String> getLikes() {
        return likes;
    }

    public int getRating() {
        return rating;
    }

    public int getDiscount() {
        return discount;
    }

    public boolean isPhotoLink() {
        return photoLink != null;
    }

    public boolean isLikes() {
        return likes != null;
    }

    public boolean isHashTags() {
        return hashTags != null;
    }

    public boolean isComments() {
        return comments != null;
    }

    public void addComment(Comment comment) {
        if (comment.isValidComment()) {
            this.comments.add(comment);
        }
    }

    private boolean findLike(String username) {
        return this.likes.stream()
                       .filter(like -> like.equals(username))
                       .findFirst().orElse(null) == null;
    }

    public void updateLike(String username) {
        if (findLike(username)) {
            this.likes.add(username);
        } else {
            this.likes.remove(username);
        }
    }

    @Override
    public String toString() {
        JSONObject json = new JSONObject();
        json.put("id", id);
        json.put("description", description);
        json.put("author", author);
        String photoLink = isPhotoLink() ? this.photoLink : "";
        json.put("photoLink", photoLink);
        json.put("createdAt", createdAt);
        json.put("validateUntil", validateUntil);
        String likes = isLikes() ? this.likes.toString() : "";
        json.put("likes", likes);
        json.put("rating", rating);
        json.put("discount", discount);
        String hashTags = isHashTags() ? this.hashTags.toString() : "";
        json.put("hashTags", hashTags);
        return json.toString();
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setValidateUntil(Date validateUntil) {
        this.validateUntil = validateUntil;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public void setHashTags(List<String> hashTags) {
        this.hashTags = hashTags;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public String toJson() {
        String result;
        Gson gson = new Gson();
        result = gson.toJson(this);
        return result;
    }
}