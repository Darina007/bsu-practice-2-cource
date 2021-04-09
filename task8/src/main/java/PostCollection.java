import java.util.*;

public class PostCollection {
    private List<Post> posts;
    private static final String KEY_AUTHOR = "author";
    private static final String KEY_CREATION_DATE = "creationDate";
    private static final String KEY_VALIDATE_UNTIL ="validateUntil";
    private static final String KEY_HASHTAG = "hashTag";
    private static final String KEY_RATING = "rating";
    private static final String KEY_DISCOUNT = "discount";

    public PostCollection(List<Post> posts) {
        this.posts = posts;
    }

    public List<Post> getPage(int skip, int top, Map<String, ?> filterConfig) {
        List<Post> filteredPosts = new ArrayList<>();
        for (Map.Entry pair : filterConfig.entrySet()) {
            if (pair.getKey().equals(KEY_AUTHOR)) {
                if (pair.getValue() instanceof String) {
                    posts.stream()
                            .filter(post -> post.getAuthor().toLowerCase().contains(pair.getValue().toString().toLowerCase()))
                            .forEach(filteredPosts::add);
                }
            } else if (pair.getKey().equals(KEY_CREATION_DATE)) {
                if (pair.getValue() instanceof Date) {
                    posts.stream()
                            .filter(post -> post.getCreationDate().equals(pair.getValue()))
                            .forEach(filteredPosts::add);
                }
            } else if (pair.getKey().equals(KEY_VALIDATE_UNTIL)) {
                if (pair.getValue() instanceof Date) {
                    posts.stream()
                            .filter(post -> post.getValidateUntil().equals(pair.getValue()))
                            .forEach(filteredPosts::add);
                }
            } else if (pair.getKey().equals(KEY_HASHTAG)) {
                if (pair.getValue() instanceof String) {
                    posts.stream()
                            .filter(post -> Arrays.asList(post.getHashTags()).contains(pair.getValue()))
                            .forEach(filteredPosts::add);
                }
            } else if (pair.getKey().equals(KEY_RATING)) {
                if (pair.getValue() instanceof Integer) {
                    posts.stream()
                            .filter(post -> post.getRating() == (int) pair.getValue())
                            .forEach(filteredPosts::add);
                }
            } else if (pair.getKey().equals(KEY_DISCOUNT)) {
                if (pair.getValue() instanceof Integer) {
                    posts.stream()
                            .filter(post -> post.getDiscount() == (int) pair.getValue())
                            .forEach(filteredPosts::add);
                }
            }
        }
        if (filterConfig.size() == 0) {
            filteredPosts = new ArrayList(posts);
        }
        if (top > filteredPosts.size()) {
            top = filteredPosts.size();
        }
        if (skip >= filteredPosts.size()) {
            skip = 0;
        }
        if (skip + top > filteredPosts.size()) {
            return filteredPosts.subList(skip, filteredPosts.size());
        } else {
            return filteredPosts.subList(skip, skip + top);
        }
    }


    public Post getPost(int id) {
        for (Post post : posts) {
            if (post.getId() == id) {
                return post;
            }
        }
        return null;
    }

    public boolean validatePost(Post post) {
        for (Post currentPost : posts) {
            if (currentPost.getId() == post.getId()) {
                return false;
            }
        }
        if (post.getDescription() == null || post.getDescription().length() > 200) {
            return false;
        }
        if (post.getAuthor() == null) {
            return false;
        }
        if (!post.getCreationDate().before(post.getValidateUntil())) {
            return false;
        }
        if (post.getDiscount() < 0 || post.getDiscount() > 100) {
            return false;
        }
        return true;
    }

    public boolean addPost(Post post) {
        if (validatePost(post)) {
            posts.add(post);
            return true;
        } else {
            return false;
        }
    }

    public boolean editPost(int id, Post filterConfig) {
        Post post = getPost(id);
        if (post == null) {
            return false;
        }
        if (filterConfig.getDescription() != null && filterConfig.getDescription().length() <= 200) {
            post.setDescription(filterConfig.getDescription());
        }
        if (filterConfig.getHashTags() != null) {
            post.setHashTags(filterConfig.getHashTags());
        }
        if (filterConfig.getValidateUntil() != null) {
            post.setHashTags(filterConfig.getHashTags());
        }
        return true;
    }

    public boolean removePost(int id) {
        Post post = getPost(id);
        if (post != null) {

            posts.remove(post);
            return true;
        } else {
            return false;
        }
    }

    public void clearAll() {
        posts.clear();
    }

    public String toString(List<Post> list) {
        if (list.size() > 0) {
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (Post post : list) {
                sb.append("\n").append(post.toString()).append(",");
            }
            sb.append("]");
            return sb.toString().replace(",]", "]");
        }
        return "";
    }
}
