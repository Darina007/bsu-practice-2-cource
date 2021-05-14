class PostEvents {
    setPostEventListener(postElement, postId) {
        const like = postElement.getElementsByClassName('like').item(0);
        if (like) {
            like.addEventListener('click',
                evt => {
                    view.postViewer.pressLike(postId);
                    storage.setItem("post" + postId, postsCollection.postToJSON(postsCollection.get(postId)));
                    evt.stopPropagation();
                }
            );
        }

        const comment = postElement.getElementsByClassName('comment').item(0);
        if (comment) {
            comment.addEventListener('click',
                evt => {
                    createCommentArea(postId);
                    evt.stopPropagation();
                }
            );
        }
        const deletePost = postElement.getElementsByClassName('delete').item(0);
        if (deletePost) {
            deletePost.addEventListener('click',
                evt => {
                    modals.createDeleteModal(postId);
                    evt.stopPropagation();
                });
        }

        const editPost = postElement.getElementsByClassName('edit').item(0);
        if (editPost) {
            editPost.addEventListener('click',
                evt => {
                    modals.createEditModal(postId);
                    evt.stopPropagation();
                })
        }
    }

    setNewPostEventListener(postAreaElement) {
        const add = postAreaElement.getElementsByTagName("form").item(0);
        if (add) {
            add.addEventListener('submit',
                evt => {
                    addNewPost();
                    evt.stopPropagation();
                }
            );
        }
        const addPost = postAreaElement.getElementsByTagName("input").item(0);
        if (addPost) {
            addPost.addEventListener('click',
                evt => {
                    addPhoto('img-file', 'file-preview');
                    evt.stopPropagation();
                }
            );
        }
    }
}

(() => {
    window.postEvent = new PostEvents();
})();