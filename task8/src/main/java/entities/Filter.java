package entities;

import lombok.Builder;

import java.util.Date;
import java.util.List;

@Builder
public class Filter {
    private String author;
    private List<String> hashtags;
    private int discount;
    private int rating;
    private Date createdAt;
    private Date validateUntil;

    public boolean isFilter() {
        return isAuthor() || isHashtags() ||
               isDiscount() || isRating() ||
               isCreatedAt() || isValidateUntil();
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setHashtags(List<String> hashtags) {
        this.hashtags = hashtags;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setValidateUntil(Date validateUntil) {
        this.validateUntil = validateUntil;
    }

    public String getAuthor() {
        return author;
    }

    public List<String> getHashtags() {
        return hashtags;
    }

    public int getDiscount() {
        return discount;
    }

    public int getRating() {
        return rating;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getValidateUntil() {
        return validateUntil;
    }

    public boolean isAuthor() {
        return author != null;
    }

    public boolean isHashtags() {
        return hashtags != null;
    }

    public boolean isDiscount() {
        return discount >= 0 && discount <= 100;
    }

    public boolean isRating() {
        return rating > 0 && rating <= 5;
    }

    public boolean isCreatedAt() {
        return createdAt != null;
    }

    public boolean isValidateUntil() {
        return validateUntil != null;
    }
}
