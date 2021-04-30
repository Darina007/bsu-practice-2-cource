class Modals {
    closeModal(modal) {
        let closeBtn = document.querySelector('.close');
        modal.classList.toggle('show-modal');
        closeBtn.addEventListener('click', toggleModal);
        window.addEventListener('click', windowOnClick);
    }

    createSingInModal() {
        let modal = document.getElementsByClassName('modal').item(0);
        modal.innerHTML = `
        <div class="modal-content">
            <span class="close">×</span>
            <h1 class="modal-text">Sign in</h1>
            <form id="sign-in-form">
                <div class="username-input-div">
                 <p class="username-warning">There is no such username. Try again.</p>
                    <input class="username-input" placeholder=" username">
                </div>
                <div class="password-input-div">
                 <p class="password-warning">Incorrect password. Try again.</p>
                <input class="password" type="password" placeholder=" password">
                </div>
            <div class="log-button-area">
            <p class="sign-in-warning">There is no such user. Try again.</p>
            <input type="submit" class="log-button" value="Sign in">
            </div>
            </form>
        </div>`;
        window.modals.closeModal(modal);
        const form = document.getElementById("sign-in-form");
        form.onsubmit = () => {
            return false;
        };
        form.addEventListener('submit', readInputFieldsLogIn);
    }

    createLogOutModal() {
        let modal = document.getElementsByClassName('modal').item(0);
        modal.innerHTML = ` 
         <div class="modal-content">
                <span class="close">×</span>
                <h1 class="modal-text">Are you sure you want out?</h1>
                <div class="log-button-area">
                    <button class="log-button"><strong>Yes</strong></button>
                </div>
          </div>`;
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
        modal.innerHTML = ` 
         <div class="modal-content">
                <span class="close">×</span>
                <h1 class="modal-text">Are you sure you want to delete this post?</h1>
                <div class="log-button">
                    <button class="sign-in-modal-button"><strong>Yes</strong></button>
                </div>
          </div>`;

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
        let editPost = window.postsCollection.get(postId);
        modal.innerHTML = `
        <div class="modal-content-edit">
            <span class="close">×</span>
            <h1 class="modal-text">Editing</h1>
            <form id="edit-form">
             <div class="post">
                <div class="first-post-raw">
                    <div class="first-post-column">
                        <div class="post-img" data-target="photoLink"><a></a><img src="img/post_img.png" alt=""></a>
                        </div>
                    </div>
                    <div class="second-post-column">
                        <div class="vendor-name" data-target="author">${editPost.author}</div>
                        <div class="validity-info">
                            <div class="validity-info-text">Offer is valid until</div>
                            <div><input type="date" id="validateUntil" value="${window.view.postViewer.dateForm(editPost.validateUntil)}"></div>
                        </div>
                        <div class="description" ><textarea id="description">${editPost.description}</textarea></div>
                        <a href="" data-target="link">see more</a>
                    </div>
                </div>
                <div class="second-post-raw">
                    <div class="hashtag" ><textarea id="hashTags">${editPost.hashTags.join(' ')}</textarea></div>
                    <div class="sale" ><textarea id="discount">${editPost.discount}</textarea></div>
                </div>
            </div>
            <div class="load-more-posts">
                <input type="submit" class="edit-modal-button" value="Edit">
            </div>
            </form>
        </div>`;
        window.modals.closeModal(modal);
        const form = document.getElementById("edit-form");
        form.onsubmit = () => {
            return false;
        };
        form.addEventListener('submit', () => {
            readInputFieldsEdit(postId);
        });
    }
}


(() => {
    window.modals = new Modals();
})();