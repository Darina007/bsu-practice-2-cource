class Modals {
    closeModal(modal) {
        let closeBtn = document.querySelector('.close');
        modal.classList.toggle('show-modal');
        closeBtn.addEventListener('click', toggleModal);
        window.addEventListener('click', windowOnClick);
    }

    createSingInModal() {
        let modal = document.getElementsByClassName("modal").item(0);
        let signInTemplate = document.getElementById("sign-in-template");
        let signInModal = document.importNode(signInTemplate.content, true);
        modal.appendChild(signInModal);
        window.modals.closeModal(modal);
        const form = document.getElementById("sign-in-form");
        form.onsubmit = () => {
            return false;
        };
        form.addEventListener("submit", readInputFieldsLogIn);
    }

    createLogOutModal() {
        let modal = document.getElementsByClassName('modal').item(0);
        let logOutTemplate = document.getElementById("log-out-template");
        let logOutModal = document.importNode(logOutTemplate.content, true);
        modal.appendChild(logOutModal);
        let yesBtn = document.querySelector('.log-button');
        window.modals.closeModal(modal);
        yesBtn.addEventListener('click', () => {
            window.view.unFillUser();
            makePage();
            toggleModal();
        });
    }

    createDeleteModal(postId) {
        let modal = document.getElementsByClassName('modal').item(0);
        let deleteTemplate = document.getElementById("delete-modal-template");
        let deleteModal = document.importNode(deleteTemplate.content, true);
        modal.appendChild(deleteModal);
        let yesBtn = document.querySelector('.sign-in-modal-button');
        modals.closeModal(modal);
        yesBtn.addEventListener('click', () => {
            view.postViewer.deletePost(postId);
            postsCollection.removePost(postId);
            storage.removeItem("post" + postId);
            toggleModal();
        });

    }

    createEditModal(postId) {
        let modal = document.getElementsByClassName('modal').item(0);
        let editTemplate = document.getElementById("edit-modal-template");
        let editModal = document.importNode(editTemplate.content, true);
        this._fillEditFields(postId, editModal);
        modal.appendChild(editModal);
        window.modals.closeModal(modal);
        const form = document.getElementById("edit-form");
        form.onsubmit = () => {
            return false;
        };
        const editPhoto = document.getElementById("edit-img-file");
        editPhoto.addEventListener('click',() => {
                addPhoto('edit-img-file', 'edit-file-preview');
            }
        );
        form.addEventListener('submit', () => {
            readInputFieldsEdit(postId);
        });
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