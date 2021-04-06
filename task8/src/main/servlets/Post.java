import java.util.Date;
import java.util.List;
/* id: required field
description: required field (length < 200)
createdAt: required field
validateUntil: required field
author: required field
photoLink: optional field
hashTags: optional field
discount: required field (in percent)
rating: optional field (from 1 to 5) //
likes: optional field  */

public class Post {
    private static int counterOfId = 1;
    private int id; //write creating id
    private String description;
    private Date createdAt;
    private Date validateUntil;
    private String author;
    private String photoLink;
    private List<String> hashTags;
    private int discount;
    private List<String> likes;


    public Post(String description, Date createdAt, Date validateUntil,
                String author, String photoLink, List<String> hashTags, int discount,
                List<String> likes) {
        this.description = description;
        this.createdAt = createdAt;
        this.validateUntil = validateUntil;
        this.author = author;
        this.photoLink = photoLink;
        this.hashTags = hashTags;
        this.discount = discount;
        this.likes = likes;
        this.id = counterOfId;
        counterOfId++;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getValidateUntil() {
        return validateUntil;
    }

    public void setValidateUntil(Date validateUntil) {
        this.validateUntil = validateUntil;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public void setHashTags(List<String> hashTags) {
        this.hashTags = hashTags;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public List<String> getLikes() {
        return likes;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public String printPost() {
        String textOfPost = "Author: " + this.author +
                ",\ndescription: " + this.description +
                ",\ndiscount: " + this.discount;
        return textOfPost;
    }

   /* @Override
    public String toString() {
        JSONObject json = new JSONObject();
        json.put("id", id);
        json.put("description", description);
        json.put("author", author);
        json.put("photoLink", photoLink);
        json.put("Date", createdAt);
        json.put("likes", likes.toString());
        json.put("hashTags", hashTags.toString());
        return json.toString();
    }*/
}