class PostEvents {
    setPostEventListener(postElement, postId) {
        const like = postElement.getElementsByClassName('like').item(0);
        if (like) {
            like.addEventListener('click',
                evt => {
                    postEvent._updateLike(postId);
                    evt.stopPropagation();
                }
            );
        }

        const comment = postElement.getElementsByClassName('comment').item(0);
        if (comment) {
            comment.addEventListener('click',
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
                    postEvent._postNewPost().catch(() => modals.createErrorModal("Server error"));
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

    async deletePost(url, id) {
        return await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then(response => response.status);
    }

    async editPost(url, id, editFields) {
        return await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                description: editFields.description,
                discount: editFields.discount,
                hashTags: editFields.hashTags,
                validateUntil: editFields.validateUntil,
            })
        }).then(response => response.status);
    }

    async postLike(postId, url) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: postId, author: view.getUser()})
        }).then(response => response.status);
    }

    _updateLike(postId) {
        postEvent.postLike(postId, "/post/update/like").then((response) => {
                if (response !== 200) {
                    modals.createErrorModal("Error updating like");
                    return;
                }
                view.postViewer.pressLike(postId);
            }
        );
    }

    async _postNewPost() {
        let newPost = addPostEvent.fillNewPostData();
        const image = document.getElementById('img-file');
        await addPostEvent.postPhoto(image.files[0], "/upload");
        await addPostEvent.postData(newPost, "/post").then(response => {
            if (response !== 200) {
                addPostEvent.removePostArea();
                modals.createErrorModal("Error adding post on service");
                return;
            }
            if (!postServise.add(newPost)) {
                addPostEvent.removePostArea();
                modals.createErrorModal("Error adding post");
                return;
            }
            addPostEvent.removePostArea();
            feedEvents.makePage(feedEvents.skippedPost, feedEvents.countPosts).then();
        });
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