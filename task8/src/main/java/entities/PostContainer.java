package entities;

import java.util.*;

public class PostContainer {
    public static List<Post> posts = TestPosts.testPosts;

    public PostContainer(List<Post> posts) {
        PostContainer.posts = posts;
    }

    public static List<Post> getPage(int skip, int top, Filter filterConfig, List<Post> posts) {
        List<Post> filteredPosts = new ArrayList<>();
        if (filterConfig.isFilter()) {
            if (filterConfig.isAuthor()) {
                posts.stream()
                        .filter(post -> post.getAuthor().toLowerCase().contains(filterConfig.getAuthor()))
                        .forEach(filteredPosts::add);

            } else if (filterConfig.isCreatedAt()) {
                posts.stream()
                        .filter(post -> post.getCreatedAt().compareTo(filterConfig.getCreatedAt()) >= 0)
                        .forEach(filteredPosts::add);
            } else if (filterConfig.isValidateUntil()) {
                posts.stream()
                        .filter(post -> post.getValidateUntil().compareTo(filterConfig.getValidateUntil()) >= 0)
                        .forEach(filteredPosts::add);
            } else if (filterConfig.isHashtags()) {
                posts.stream()
                        .filter(post -> containTag(post, filterConfig.getHashtags()))
                        .forEach(filteredPosts::add);
            } else if (filterConfig.isRating()) {
                posts.stream()
                        .filter(post -> post.getRating() >= filterConfig.getRating())
                        .forEach(filteredPosts::add);
            } else if (filterConfig.isDiscount()) {
                posts.stream()
                        .filter(post -> post.getDiscount() >= filterConfig.getDiscount())
                        .forEach(filteredPosts::add);
            }
        }
        if (!filterConfig.isFilter()) {
            filteredPosts = posts;
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

    public static List<Post> getPage(int skip, int top, List<Post> posts) {
        List<Post> filteredPosts = posts;
        if (top > filteredPosts.size()) {
            top = filteredPosts.size();
        }
        if (skip >= filteredPosts.size()) {
            skip = 0;
        }
        filteredPosts.sort(Comparator.comparing(Post::getCreatedAt));
        if (skip + top > filteredPosts.size()) {
            return filteredPosts.subList(skip, filteredPosts.size());
        } else {
            return filteredPosts.subList(skip, skip + top);
        }
    }

    public static Post getPost(long id) {
        return posts.stream()
                .filter(post -> post.getId() == id)
                .findFirst().orElse(null);
    }

    public static boolean addPost(Post post) {
        if (!post.isValid()) {
            return false;
        }
        posts.add(post);
        return true;
    }

    public static boolean editPost(long id, Post filterConfig) {
        Post post = getPost(id);
        if (post == null) {
            return false;
        }
        if (filterConfig.isDescription() && filterConfig.isValidDescription()) {
            post.setDescription(filterConfig.getDescription());
        }
        if (filterConfig.isDateOfValidation()) {
            post.setHashTags(filterConfig.getHashTags());
        }
        if (filterConfig.isHashTags()) {
            post.setHashTags(filterConfig.getHashTags());
        } else {
            post.getHashTags().clear();
        }
        if (filterConfig.isValidDiscount()) {
            post.setDiscount(filterConfig.getDiscount());
        }
        return true;
    }

    public static boolean removePost(long id) {
        Post post = getPost(id);
        if (post == null) {
            return false;
        }
        posts.remove(post);
        return true;
    }

    public static String toJson(List<Post> posts) {
        if (posts.size() > 0) {
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (Post post : posts) {
                sb.append(post.toJson()).append(",");
            }
            sb.append("]");
            return sb.toString().replace(",]", "]");
        }
        return "";
    }

    private static boolean containTag(Post post, List<String> tags) {
        List<String> result = new ArrayList<>();
        tags.stream().filter(tag -> post.getHashTags().contains(tag)).forEach(result::add);
        if (result.size() == 0) {
            return false;
        }
        return true;
    }
}
