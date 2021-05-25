package entities;

import lombok.Builder;

@Builder
public class User{
    private String userName;
    private long userId;

    public String getUserName() {
        return userName;
    }

    public long getUserId() {
        return userId;
    }
}
