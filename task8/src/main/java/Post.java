import lombok.Builder;
import org.json.JSONObject;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Builder
public class Post {
    private String id;
    private String author;
    private String description;
    private Date creationDate;
    private Date validateUntil;
    private String photoLink;
    private List<String> hashTags;
    private List<String> likes;
    private int rating;
    private int discount;

    public static String generateID() {
        return UUID.randomUUID().toString();
    }

    public boolean isValid() {
        if (description == null || description.length() > 200) {
            return false;
        }
        if (author == null) {
            return false;
        }
        if (!creationDate.before(validateUntil)) {
            return false;
        }
        if (discount < 0 || discount > 100) {
            return false;
        }
        return true;
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

    public Date getCreationDate() {
        return creationDate;
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

    @Override
    public String toString() {
        JSONObject json = new JSONObject();
        json.put("id", id);
        json.put("description", description);
        json.put("author", author);
        if (photoLink != null) {
            json.put("photoLink", photoLink);
        } else {
            json.put("photoLink", "");
        }
        json.put("Date of creation", creationDate);
        json.put("Date of validity", validateUntil);
        if (likes != null) {
            json.put("likes", likes.toString());
        } else {
            json.put("likes", "");
        }
        json.put("rating", rating);
        json.put("discount", discount);
        if (hashTags != null) {
            json.put("hashTags", hashTags.toString());
        } else {
            json.put("hashTags", "");
        }
        return json.toString();
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
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
}