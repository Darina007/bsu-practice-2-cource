class FeedEvents {
    next = document.querySelector('.navigation-page-next');
    prev = document.querySelector('.navigation-page-prev');
    page = document.getElementById('page');
    skippedPost = 0;
    countPosts = 10;

    initializeAddPostButton() {
        let button = document.getElementById("add-post");
        button.addEventListener("click", () => {
            feedEvents.initializeAddPostArea();
        })
    }

    initializeAddPostArea() {
        let addPostArea = document.querySelector('[class = "add-post-form"]');
        if (!addPostArea) {
            addPostArea = feedEvents.drawPostArea();
            postEvent.setNewPostEventListener(addPostArea);
            document.getElementById("new-post-form").onsubmit = () => {
                return false;
            }
        } else {
            feedEvents.removePostArea();
        }
    }

    addPhoto(imageInputId, imageHolderId) {
        const image = document.getElementById(imageInputId);
        const filePreview = document.getElementById(imageHolderId);
        image.addEventListener("change", () => {
            uploadFile(image.files[0]);
        })
        function uploadFile(file) {
            if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
                alert("The file is not an image");
                image.value = "";
                return;
            }
            if (file.size > 2 * Math.pow(1024, 2)) {
                alert("File too large");
                return;
            }
            let reader = new FileReader();
            reader.onload = function (e) {
                filePreview.innerHTML = `<img src="${e.target.result}" alt="Photo" class="file-photo">`;
            }
            reader.readAsDataURL(file);
        }
    }

    initializeFilter() {
        const form = document.getElementById("filter");
        feedEvents.fillDateFilterFields();
        form.onsubmit = () => {
            return false;
        };
        form.addEventListener("submit", () => {
            const filterConf = feedEvents.fillFilter();
            view.setFilter(filterConf);
            let filter = view.getFilter();
            feedEvents.makePage(0, 10, filter);
            form.reset();
            feedEvents.fillDateFilterFields();
        });
    }

    fillDateFilterFields() {
        const createAtVal = document.getElementById("createdAt");
        if (createAtVal) {
            createAtVal.value = view.postViewer.dateForm(new Date());
        }
        const validateUntilVal = document.getElementById("validateUntil");
        if (validateUntilVal) {
            validateUntilVal.value = view.postViewer.dateForm(new Date());
        }
    }

    fillAddPostFields(postForm) {
        let validateUntil = postForm.getElementById('validate-until-field');
        validateUntil.value = view.postViewer.dateForm(new Date());
        let author = postForm.getElementById('author');
        author.textContent = view.getUser();
    }

    drawPostArea() {
        let dataField = document.createElement("div");
        let container = document.getElementById("container");
        let _addPostTemplate = document.getElementById("new-post-template");
        dataField.className = "add-post-form";
        let postForm = document.importNode(_addPostTemplate.content, true);
        feedEvents.fillAddPostFields(postForm);
        dataField.appendChild(postForm);
        container.insertBefore(dataField, container.firstChild);
        return dataField;
    }

    removePostArea() {
        let dataField = document.querySelector('[class = "add-post-form"]');
        dataField.remove();
    }

    fillFilter() {
        const filterConf = [];
        const author = document.getElementById("vendor-filter").value;
        if (author !== "all vendors") {
            filterConf.author = author;
        }
        const discount = document.getElementById("discount").value;
        if (discount) {
            filterConf.discount = discount;
        }
        const rating = document.getElementById("rating").value;
        if (rating) {
            filterConf.rating = rating;
        }
        const tags = document.getElementById("hashtags").value;
        if (tags) {
            filterConf.hashTags = tags.split(" ");
        }
        const createAt = document.getElementById("createdAt").value;
        const validateUntil = document.getElementById("validateUntil").value;
        let currentDate = view.postViewer.dateForm(new Date());
        let dates = [];
        if (createAt !== currentDate || validateUntil !== currentDate) {
            dates.createAt = new Date(createAt);
            dates.validateUntil = new Date(validateUntil);
        }
        filterConf.createdAt = dates.createAt;
        filterConf.validateUntill = dates.validateUntil;
        return filterConf;
    }

    fillNewPostData() {
        const image = document.getElementById('img-file').value;
        const validateUntil = document.getElementById('validate-until-field').value;
        const description = document.getElementById('description-field').value;
        const discount = document.getElementById('discount-field').value;
        const tagsStr = document.getElementById('hashTags-field').value;
        let tags = tagsStr.split(' ');
        let post = {};
        post.id = Date.now().toString(32) + (Math.random() * Math.pow(2, 20)).toString(32);
        post.description = description;
        post.author = view.getUser();
        post.photoLink = image;
        post.createdAt = new Date();
        post.validateUntil = new Date(validateUntil);
        post.discount = discount;
        post.hashTags = tags;
        post.likes = [];
        post.comments = [];
        return post;
    }

    addNewPost() {
        let newPost = feedEvents.fillNewPostData();
        if (postsCollection.add(newPost)) {
            storage.setItem("post" + newPost.id, postsCollection.postToJSON(newPost));
            feedEvents.removePostArea();
            feedEvents.makePage(0, feedEvents.countPosts);
        } else {
            feedEvents.removePostArea();
            modals.createErrorModal("Error adding post")
        }
    }

    makePage(firstPostNumber, postNumber, filter) {
        for (let i = 0; i < storage.length; i++) {
            postsCollection.add(postsCollection.JSONToPost(storage.getItem(storage.key(i))));
        }
        let posts = postsCollection.getPage(firstPostNumber, postNumber, filter);
        if (posts) {
            view.redrawPosts(posts);
        }
        feedEvents.initializeFilter();
        feedEvents.setPostEvents(posts);
        feedEvents.next.addEventListener('click', feedEvents.loadNextPosts);
        feedEvents.prev.addEventListener('click', feedEvents.loadPreviousPosts);
        if (view.isAuthorized()) {
            let logOutBtn = document.querySelector('.logout-button');
            logOutBtn.removeEventListener('click', modals.createSingInModal);
            logOutBtn.addEventListener('click', modals.createLogOutModal);
            feedEvents.initializeAddPostButton();
        } else {
            let signInBtn = document.querySelector('.login-button');
            signInBtn.removeEventListener('click', modals.createLogOutModal);
            signInBtn.addEventListener('click', modals.createSingInModal);
        }
    }

    createCommentArea(postId) {
        let post = document.getElementById(postId);
        let container = post.parentNode;
        let commentArea = document.querySelector('[class = "add-comment"]');
        if (!commentArea) {
            feedEvents.drawCommentContainer(container, postId);
            feedEvents.createCommentMarkButtons();
            feedEvents.initializeCommentForm(postId);
        } else {
            container.classList.remove("post-dedicated");
            commentArea.remove();
        }
    }

    drawCommentContainer(container, postId) {
        container.classList.add("post-dedicated");
        let commentArea = feedEvents.drawCommentArea();
        container.appendChild(commentArea);
        feedEvents._loadComments(postId);
        let addCommentArea = document.querySelector('[class="new-user-comment"]');
        feedEvents.drawAddCommentArea(addCommentArea);
    }

    drawCommentArea() {
        let commentTemplate = document.getElementById("comment-area-template");
        let comment = document.importNode(commentTemplate.content, true);
        let commentArea = document.createElement('div');
        commentArea.className = "add-comment";
        commentArea.appendChild(comment);
        return commentArea;
    }

    drawAddCommentArea(container) {
        if (view.isAuthorized()) {
            let addCommentTemplate = document.getElementById("add-comment-template");
            let addComment = document.importNode(addCommentTemplate.content, true);
            container.appendChild(addComment);
        } else {
            let addCommentMessage = document.createElement("div");
            addCommentMessage.id = "new-comment-form";
            let message = document.createElement("div");
            message.id = "comment-text-input";
            message.textContent = "Sign in to leave a comment";
            addCommentMessage.appendChild(message);
            container.appendChild(addCommentMessage);
        }
    }

    initializeCommentForm(postId) {
        let commentForm = document.getElementById("new-comment-form");
        commentForm.onsubmit = () => {
            return false;
        }
        commentForm.addEventListener("submit", () => {
            let mark = feedEvents.fillCommentMark();
            this.addComment(postId, mark);
            commentForm.reset();
            feedEvents.redrawReviewButtons(0);
        })
    }

    updateCommentMark() {
        let button = event.target;
        let numb = button.id.substr(button.id.length - 1);
        feedEvents.redrawReviewButtons(numb);
        return numb;
    }

    fillCommentMark() {
        let mark = document.querySelector('[class="review-buttons"]');
        for (let i = 5; i >= 1; i--) {
            let button = mark.childNodes[i - 1];
            if (button.lastChild.alt === "star_pressed") {
                return i;
            }
        }
    }

    addComment(postId, markValue) {
        let commentData = {};
        let text = document.getElementById("comment-text-input");
        commentData.commentText = text.value;
        commentData.commentDate = new Date();
        commentData.commentMark = markValue;
        commentData.commentAuthor = view.getUser();
        if (postsCollection.addComment(postId, commentData)) {
            feedEvents._reloadComments(postId);
            storage.setItem("post" + postId, postsCollection.postToJSON(postsCollection.get(postId)));
        }
    }

    createCommentMarkButtons() {
        let mark = document.querySelector('[class="review-buttons"]');
        feedEvents.drawReviewButtons(mark);
        mark.addEventListener('click', () => {
            feedEvents.updateCommentMark();
        })
    }

    drawReviewButtons(buttonContainer, mark) {
        let button;
        for (let i = 1; i <= 5; i++) {
            if (i <= mark) {
                button = view.postViewer._drawPostButton("review-button", "star_pressed");
            } else {
                button = view.postViewer._drawPostButton("review-button", "star_unpressed");
            }
            button.lastChild.id = "review-" + i;
            buttonContainer.appendChild(button);
        }
    }

    isClearReviewButton(buttonsContainer) {
        return buttonsContainer.childNodes[0].lastChild.alt === "star_pressed";
    }

    redrawReviewButtons(mark) {
        let buttons = document.querySelector('[class="review-buttons"]');
        let flag = feedEvents.isClearReviewButton(buttons);
        while (buttons.firstChild) {
            buttons.removeChild(buttons.firstChild);
        }
        if (flag && +mark === 1) {
            feedEvents.drawReviewButtons(buttons, 0);
        } else {
            feedEvents.drawReviewButtons(buttons, mark);
        }
    }

    _loadComments(postId) {
        let post = postsCollection.get(postId);
        let commArr = document.querySelector('[class="user-comments"]');
        if (post.comments) {
            post.comments.reverse();
            post.comments.forEach(comment => {
                let comm = document.createElement("div");
                commArr.appendChild(comm);
                comm.className = "comment-holder";
                let commentTemplate = document.getElementById("comment-template");
                let commentField = document.importNode(commentTemplate.content, true);
                comm.appendChild(commentField);
                feedEvents._fillComment(comment, comm);
            })
        }
    }

    _reloadComments(postId) {
        let commArr = document.querySelector('[class="user-comments"]');
        if (commArr) {
            while (commArr.lastChild) {
                commArr.removeChild(commArr.lastChild);
            }
        }
        feedEvents._loadComments(postId);
    }

    _fillComment(comment, comm) {
        let author = comm.querySelector('[id="comment-author"]');
        if (author) {
            author.textContent = comment.commentAuthor;
        }
        let date = comm.querySelector('[id="date-comment"]');
        if (date) {
            date.textContent = comment.commentDate.toDateString();
        }
        let text = comm.querySelector('[id="comment-text"]');
        if (text) {
            text.textContent = comment.commentText;
        }
        let mark = comm.querySelector('[id="comment-mark"]');
        if (mark) {
            view.postViewer._drawRating(mark, comment.commentMark);
        }
        return comm;
    }

    readInputFieldsLogIn() {
        const username = document.getElementsByClassName('username-input').item(0).value;
        if (!username) {
            feedEvents.showWarnings(".username-warning");
        }
        const password = document.getElementsByClassName('password').item(0).value;
        if (!password) {
            feedEvents.showWarnings(".password-warning");
        }
        if (password && username) {
            const user = usersCollection.getUser(username, password);
            if (user) {
                view.fillUser(user.username);
                feedEvents.makePage(0, 10);
                modals.removeModal();
            } else {
                feedEvents.showWarnings(".sign-in-warning");
            }
        }
    }

    showWarnings(warningType) {
        let warning = document.querySelector(warningType);
        if (warning) {
            warning.classList.add("show-warning");
        }
    }

    readInputFieldsEdit(postId) {
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
        postsCollection.edit(postId, postEditions);
        storage.setItem("post" + postId, postsCollection.postToJSON(postsCollection.get(postId)));
        feedEvents.makePage(0, 10);
        modals.removeModal();
    }

    loadNextPosts() {
        if (postsCollection.countPosts() / 10 + 1 >= +feedEvents.page.textContent + 1) {
            feedEvents.makePage(feedEvents.skippedPost + feedEvents.countPosts, feedEvents.countPosts + 10);
            feedEvents.skippedPost += 10;
            feedEvents.page.textContent++;
        }
    }

    loadPreviousPosts() {
        if (+feedEvents.page.textContent - 1 > 0) {
            feedEvents.makePage(feedEvents.skippedPost - feedEvents.countPosts, feedEvents.countPosts - 10);
            feedEvents.skippedPost -= 10;
            feedEvents.page.textContent--;
        }
    }

    setPostEvents(posts) {
        posts.forEach(post => {
            let postElem = document.getElementById(post.id);
            postEvent.setPostEventListener(postElem, post.id);
        })
    }
}

(() => {
    window.feedEvents = new FeedEvents();
})();
