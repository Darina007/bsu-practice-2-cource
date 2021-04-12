function addPost(post, postModel, feedView) {
    if (postModel.add(post)) {
        feedView.postViewer.drawPost(post);
        return true;
    }
    return false;
}

function editPost(id, changes, postModel, feedView) {
    if (postModel.edit(id, changes)) {
        feedView.postViewer.redrawPost(id, postModel.get(id));
        return true;
    }
    return false;
}

function deletePost(id, postModel, feedView) {
    if (postModel.remove(id)) {
        feedView.postViewer.deletePost(id);
        return true;
    }
    return false;
}

function showFeed(filterConfig = {}, postModel, feedView) {
    feedView.redrawPosts(postModel.getPage(0, 10, filterConfig));
}