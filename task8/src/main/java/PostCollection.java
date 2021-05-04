import com.google.gson.Gson;

import java.util.*;

public class PostCollection {
    private List<Post> posts;

    public PostCollection(List<Post> posts) {
        this.posts = posts;
    }

    public List<Post> getPage(int skip, int top, Map<String, ?> filterConfig) {
        List<Post> filteredPosts = new ArrayList<>();
        for (Map.Entry pair : filterConfig.entrySet()) {
            if (pair.getKey().equals(ConstantDictionary.KEY_AUTHOR)) {
                if (pair.getValue() instanceof String) {
                    posts.stream()
                            .filter(post -> post.getAuthor().toLowerCase().contains(pair.getValue().toString().toLowerCase()))
                            .forEach(filteredPosts::add);
                }
            } else if (pair.getKey().equals(ConstantDictionary.KEY_CREATION_DATE)) {
                if (pair.getValue() instanceof Date) {
                    posts.stream()
                            .filter(post -> post.getCreationDate().equals(pair.getValue()))
                            .forEach(filteredPosts::add);
                }
            } else if (pair.getKey().equals(ConstantDictionary.KEY_VALIDATE_UNTIL)) {
                if (pair.getValue() instanceof Date) {
                    posts.stream()
                            .filter(post -> post.getValidateUntil().equals(pair.getValue()))
                            .forEach(filteredPosts::add);
                }
            } else if (pair.getKey().equals(ConstantDictionary.KEY_HASHTAG)) {
                if (pair.getValue() instanceof String) {
                    posts.stream()
                            .filter(post -> Objects.equals(post.getHashTags(), pair.getValue()))
                            .forEach(filteredPosts::add);
                }
            } else if (pair.getKey().equals(ConstantDictionary.KEY_RATING)) {
                if (pair.getValue() instanceof Integer) {
                    posts.stream()
                            .filter(post -> post.getRating() == (int) pair.getValue())
                            .forEach(filteredPosts::add);
                }
            } else if (pair.getKey().equals(ConstantDictionary.KEY_DISCOUNT)) {
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

    public Post getPost(String id) {
        return posts.stream()
                .filter(post -> post.getId().equals(id))
                .findFirst().orElse(null);
    }

    public boolean addPost(Post post) {
        if (post.isValid()) {
            posts.add(post);
            return true;
        } else {
            return false;
        }
    }

    public boolean editPost(String id, Post filterConfig) {
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

    public boolean removePost(String id) {
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
            Gson gson = new Gson();
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (Post post : list) {
                sb.append(gson.toJson(post)).append(",");
            }
            sb.append("]");
            return sb.toString().replace(",]", "]");
        }
        return "";
    }
}
