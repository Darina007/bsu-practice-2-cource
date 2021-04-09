import java.util.Date;
import java.util.List;

public class Post {
    private static int counterForId = 1;
    private int id;
    private String author;
    private String description;
    private Date creationDate;
    private Date validateUntil;
    private String photoLink;
    private List<String> hashTags;
    private List<String> likes;
    private int rating;
    private int discount;

    public Post(String author, String description, Date creationDate,
                Date validateUntil, String photoLink,
                List<String> hashTags, List<String> likes, int rating, int discount) {
        this.author = author;
        this.description = description;
        this.creationDate = creationDate;
        this.validateUntil = validateUntil;
        this.photoLink = photoLink;
        this.hashTags = hashTags;
        this.likes = likes;
        this.rating = rating;
        this.discount = discount;
        this.id = counterForId;
        counterForId++;
    }

    public Post(String author, String description, Date creationDate,
                Date validateUntil, String photoLink,
                List<String> hashTags, int discount) {
        this.author = author;
        this.description = description;
        this.creationDate = creationDate;
        this.validateUntil = validateUntil;
        this.photoLink = photoLink;
        this.hashTags = hashTags;
        this.discount = discount;
        this.id = counterForId;
        counterForId++;
    }


    public int getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getValidateUntil() {
        return validateUntil;
    }

    public void setValidateUntil(Date validateUntil) {
        this.validateUntil = validateUntil;
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

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "Post{\n" +
                "id: " + id +
                ", \nauthor:  " + author +
                ", \ndescription: " + description +
                ", \ncreationDate: " + creationDate +
                ", \nvalidateUntil: " + validateUntil +
                ", \nphotoLink: " + photoLink +
                ", \nhashTags: " + hashTags +
                ", \nlikes: " + likes +
                ", \nrating: " + rating +
                ", \ndiscount: " + discount +
                '}';
    }

}