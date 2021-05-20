class Modals {
    modal = document.querySelector('.modal');

    closeModal(modal) {
        let closeBtn = document.querySelector('.close');
        modal.classList.toggle('show-modal');
        closeBtn.addEventListener('click', modals.removeModal);
        addEventListener('click', modals.windowOnClick);
    }

    toggleModal() {
        this.modal.classList.toggle('show-modal');

    }

    removeModal() {
        modals.toggleModal();
        while (this.modal.firstChild) {
            this.modal.removeChild(this.modal.firstChild);
        }
    }

    windowOnClick(event) {
        if (event.target === this.modal) {
            modals.toggleModal();
            modals.removeModal();
        }
    }

    createSingInModal() {
        let signInTemplate = document.getElementById("sign-in-template");
        let signInModal = document.importNode(signInTemplate.content, true);
        this.modal.appendChild(signInModal);
        modals.closeModal(this.modal);
        const form = document.getElementById("sign-in-form");
        form.onsubmit = () => {
            return false;
        };
        form.addEventListener("submit", feedEvents.readInputFieldsLogIn);
    }

    createLogOutModal() {
        let logOutTemplate = document.getElementById("log-out-template");
        let logOutModal = document.importNode(logOutTemplate.content, true);
        this.modal.appendChild(logOutModal);
        let yesBtn = document.querySelector('.log-button');
        modals.closeModal(this.modal);
        yesBtn.addEventListener('click', () => {
            view.unFillUser();
            feedEvents.makePage();
            modals.removeModal();
        });
    }

    createDeleteModal(postId) {
        let deleteTemplate = document.getElementById("delete-modal-template");
        let deleteModal = document.importNode(deleteTemplate.content, true);
        this.modal.appendChild(deleteModal);
        let yesBtn = document.querySelector('.log-button');
        modals.closeModal(this.modal);
        yesBtn.addEventListener('click', () => {
            view.postViewer.deletePost(postId);
            postsCollection.removePost(postId);
            storage.removeItem("post" + postId);
            modals.removeModal();
        });

    }

    createEditModal(postId) {
        let editTemplate = document.getElementById("edit-modal-template");
        let editModal = document.importNode(editTemplate.content, true);
        this._fillEditFields(postId, editModal);
        this.modal.appendChild(editModal);
        window.modals.closeModal(this.modal);
        const form = document.getElementById("edit-form");
        form.onsubmit = () => {
            return false;
        };
        const editPhoto = document.getElementById("edit-img-file");
        editPhoto.addEventListener('click', () => {
                feedEvents.addPhoto('edit-img-file', 'edit-file-preview');
            }
        );
        form.addEventListener('submit', () => {
            feedEvents.readInputFieldsEdit(postId);
        });
    }

    createErrorModal(message) {
        let errorTemplate = document.getElementById("error-template");
        let errorModal = document.importNode(errorTemplate.content, true);
        let messageContainer = errorModal.getElementById("error-text");
        let text = document.createElement("p");
        text.textContent = message;
        messageContainer.appendChild(text);
        this.modal.appendChild(errorModal);
        modals.removeModal();
    }

    _fillEditFields(postId, editModal) {
        let editPost = window.postsCollection.get(postId);
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
}

(() => {
    window.modals = new Modals();
})();