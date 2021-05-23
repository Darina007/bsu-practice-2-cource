class Modals {
    modal = document.querySelector('.modal');

    createSingInModal() {
        let signInTemplate = document.getElementById("sign-in-template");
        let signInModal = document.importNode(signInTemplate.content, true);
        modals.modal.appendChild(signInModal);
        modals._closeModal(modals.modal);
        const form = document.getElementById("sign-in-form");
        form.onsubmit = () => {
            return false;
        };
        form.addEventListener("submit", feedEvents.readInputFieldsLogIn);
    }

    createLogOutModal() {
        let logOutTemplate = document.getElementById("log-out-template");
        let logOutModal = document.importNode(logOutTemplate.content, true);
        modals.modal.appendChild(logOutModal);
        let yesBtn = document.querySelector('.log-button');
        modals._closeModal(modals.modal);
        yesBtn.addEventListener('click', () => {
            view.unFillUser();
            feedEvents.makePage(feedEvents.skippedPost, feedEvents.countPosts).then(() => {
                modals._removeModal();
            });
        });
    }

    createDeleteModal(postId) {
        let deleteTemplate = document.getElementById("delete-modal-template");
        let deleteModal = document.importNode(deleteTemplate.content, true);
        modals.modal.appendChild(deleteModal);
        let yesBtn = document.querySelector('.log-button');
        modals._closeModal(modals.modal);
        yesBtn.addEventListener('click', () => {
            modals._deletePost(postId).catch(reason => modals.createErrorModal(reason));
        });
    }

    createEditModal(postId) {
        let editTemplate = document.getElementById("edit-modal-template");
        let editModal = document.importNode(editTemplate.content, true);
        modals._fillEditFields(postId, editModal);
        modals.modal.appendChild(editModal);
        window.modals._closeModal(modals.modal);
        const form = document.getElementById("edit-form");
        form.onsubmit = () => {
            return false;
        };
        const editPhoto = document.getElementById("edit-img-file");
        editPhoto.addEventListener('click', () => {
                postEvent._postPhoto('edit-img-file', 'edit-file-preview');
            }
        );
        form.addEventListener('submit', () => {
            modals._editPost(postId)
                .then(() => feedEvents.makePage(feedEvents.skippedPost, feedEvents.countPosts).then())
                .catch(reason => {
                    modals.createErrorModal(reason);
                })
        });
    }

    createErrorModal(message) {
        let errorTemplate = document.getElementById("error-modal-template");
        let errorModal = document.importNode(errorTemplate.content, true);
        let messageContainer = errorModal.getElementById("text-error");
        let text = document.createElement("p");
        text.textContent = message;
        messageContainer.appendChild(text);
        modals.modal.appendChild(errorModal);
        let button = document.querySelector('[class="log-button"]');
        button.addEventListener("click", modals._removeModal);
        modals._closeModal(modals.modal);
    }

    _editPost(postId) {
        let editFields = modals._readInputFieldsEdit();
        return postEvent.editPost("/post/edit", postId, editFields).then(response => {
            if (response !== 200) {
                return new Error("Can't edit post");
            }
            postServise.edit(postId, editFields);
            modals._removeModal();
        })
    }

    _deletePost(postId) {
        return postEvent.deletePost("/post", postId).then(response => {
            if (response !== 200) {
                return new Error("Can't to delete post");
            }
            view.postViewer.deletePost(postId);
            postServise.removePost(postId);
            modals._removeModal();
        })
    }

    _readInputFieldsEdit() {
        let postEditions = [];
        const description = document.getElementById("description").value;
        if (description) {
            postEditions.description = description;
        }
        const discount = document.getElementById("edit-discount-field").value;
        if (discount) {
            postEditions.discount = discount;
        }
        const tags = document.getElementById("edit-hashTags-field").value;
        if (tags) {
            postEditions.hashTags = tags.split(" ");
        }
        const validateUntil = document.getElementById("edit-validate-until-field").value;
        if (validateUntil) {
            postEditions.validateUntil = new Date(validateUntil);
        }
        return postEditions;
    }

    _fillEditFields(postId, editModal) {
        let editPost = postServise.get(postId);
        const author = editModal.getElementById("edit-author-field");
        author.textContent = editPost.author;
        const validateUntil = editModal.getElementById("edit-validate-until-field");
        validateUntil.value = view.postViewer.dateForm(editPost.validateUntil);
        const description = editModal.getElementById("description");
        description.textContent = editPost.description;
        const hashTags = editModal.getElementById("edit-hashTags-field");
        hashTags.textContent = editPost.hashTags.join(' ');
        const discount = editModal.getElementById("edit-discount-field");
        discount.textContent = editPost.discount;
    }

    _closeModal(modal) {
        let closeBtn = document.querySelector('.close');
        modal.classList.toggle('show-modal');
        closeBtn.addEventListener('click', modals._removeModal);
        addEventListener('click', modals._windowOnClick);
    }

    _toggleModal() {
        modals.modal.classList.toggle('show-modal');
    }

    _removeModal() {
        modals._toggleModal();
        while (modals.modal.firstChild) {
            modals.modal.removeChild(modals.modal.firstChild);
        }
    }

    _windowOnClick(event) {
        if (event.target === modals.modal) {
            modals._toggleModal();
            modals._removeModal();
        }
    }
}

(() => {
    window.modals = new Modals();
})();