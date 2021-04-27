class PostEvents {
    setPostEventListener(postElement, postId) {
        const like = postElement.getElementsByClassName('like').item(0);
        if (like) {
            like.addEventListener('click',
                evt => {
                    window.view.postViewer.pressLike(postId);
                    evt.stopPropagation();
                }
            );
        }

        const deletePost = postElement.getElementsByClassName('delete').item(0);
        if (deletePost) {
            deletePost.addEventListener('click',
                evt => {
                    window.modals.buildDeleteModal(postId);
                    evt.stopPropagation();
                });
        }

        const editPost = postElement.getElementsByClassName('edit').item(0);
        if (editPost) {
            editPost.addEventListener('click',
                evt => {
                    //set getter for post data
                    window.view.postViewer.redrawPost(postId, post);
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
    }
}

(() => {
    window.postEvent = new PostEvents();
})();