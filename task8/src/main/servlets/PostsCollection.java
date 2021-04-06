import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PostsCollection {
    private List<Post> posts;

    public PostsCollection(List<Post> posts) {
        this.posts = posts;
    }

    public List<Post> getPage(int skip, int top, Map<String, String> filterConfig) {
        List<Post> filteredPosts = new ArrayList<Post>();
        for (Map.Entry pair : filterConfig.entrySet()) {
            if (pair.getKey().equals("author")) {
                posts.stream()
                        .filter(tweet -> tweet.getAuthor().toLowerCase().contains(pair.getValue().toString().toLowerCase()))
                        .forEach(filteredPosts::add);
            } else if (pair.getKey().equals("creationDate")) {
                posts.stream()
                        .filter(tweet -> tweet.getCreatedAt().equals(pair.getValue()))
                        .forEach(filteredPosts::add);
            }
        }
        if (filterConfig.size() == 0) {
            filteredPosts = new ArrayList<Post>(posts);
        }
        if (top > filteredPosts.size()) {
            top = filteredPosts.size();
        }
        if (skip + top > filteredPosts.size()) {
            return filteredPosts.subList(skip, filteredPosts.size());
        } else {
            return filteredPosts.subList(skip, skip + top);
        }
    }

    public Post getPost(int id) {
        for (Post tweet : posts) {
            if (tweet.getId() == id) {
                return tweet;
            }
        }
        return null;
    }

    public boolean validatePost(Post tweet) {
        for (Post post : posts) {
            if (post.getId() == tweet.getId()) {
                return false;
            }
        }
        if (tweet.getDescription() == null || tweet.getDescription().length() > 200) {
            return false;
        }
        if (tweet.getAuthor() == null) {
            return false;
        }
        if (tweet.getCreatedAt() == null) {
            return false;
        }
        return true;
    }

    public boolean addPost(Post tweet) {
        if (validatePost(tweet)) {
            posts.add(tweet);
            return true;
        } else {
            return false;
        }
    }

    public boolean editPost(int id, Post filterConfig) {
        Post tweet = getPost(id);
        if (tweet == null) {
            return false;
        }
        if (filterConfig.getDescription() != null && filterConfig.getDescription().length() <= 200) {
            tweet.setDescription(filterConfig.getDescription());
        }
        if (filterConfig.getHashTags() != null) {
            tweet.setHashTags(filterConfig.getHashTags());
        }
        return true;
    }

    public boolean removePost(int id) {
        Post tweet = getPost(id);
        if (tweet != null) {
            posts.remove(tweet);
            return true;
        } else {
            return false;
        }
    }
/*
    public String toJsonString(List<Post> list) {
        if (list.size() > 0) {
            Gson gson = new Gson();
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (Tweet post : list) {
                sb.append(gson.toJson(post)).append(",");
            }
            sb.append("]");
            return sb.toString().replace(",]", "]");
        }
        return "";
    }
 */
}
