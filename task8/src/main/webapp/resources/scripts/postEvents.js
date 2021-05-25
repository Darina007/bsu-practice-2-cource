class PostEvents {
    setPostEventListener(postElement, postId) {
        const likePost = postElement.getElementsByClassName('like').item(0);
        if (likePost) {
            likePost.addEventListener('click',
                evt => {
                    postServise._updateLike(postId);
                    evt.stopPropagation();
                }
            );
        }

        const commentPost = postElement.getElementsByClassName('comment').item(0);
        if (commentPost) {
            commentPost.addEventListener('click',
                evt => {
                    commentEvent.createCommentArea(postId);
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
                    try {
                        postServise._postNewPost();
                    } catch (error) {
                        modals.createErrorModal("Server error");
                    }
                    evt.stopPropagation();
                }
            );
        }
        const addPhoto = postAreaElement.getElementsByTagName("input").item(0);
        if (addPhoto) {
            addPhoto.addEventListener('click',
                evt => {
                    postEvent.drawPreviewPhoto('img-file', 'file-preview');
                    evt.stopPropagation();
                }
            );
        }
    }

    drawPreviewPhoto(imageInputId, imageHolderId) {
        const image = document.getElementById(imageInputId);
        const filePreview = document.getElementById(imageHolderId);
        image.addEventListener("change", () => {
            if (postEvent.isPhoto(image.files[0], imageInputId)) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    filePreview.innerHTML = `<img src="${e.target.result}" alt="Photo" class="file-photo">`;
                }
                reader.readAsDataURL(image.files[0]);
            }
        })
    }

    isPhoto(file, imageInputId) {
        let warning = document.querySelector('[class="file-warning"]');
        const image = document.getElementById(imageInputId);
        if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
            warning.textContent = "The file is not an image";
            warning.classList.add("show-warning");
            image.value = "";
            return false;
        }
        if (file.size > 2 * Math.pow(1024, 2)) {
            warning.textContent = "File too large";
            warning.classList.add("show-warning");
            return false;
        }
        return true;
    }
}

(() => {
    window.postEvent = new PostEvents();
})();