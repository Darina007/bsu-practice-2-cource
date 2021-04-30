let modal = document.querySelector('.modal');
let next = document.querySelector('.navigation-page-next');
let prev = document.querySelector('.navigation-page-prev');
let page = document.getElementById('page');
let skippedPost = 0;
let countPosts = 10;

function toggleModal() {
    modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

function initializeNewPostsArea(user) {
    let container = document.getElementById("container");
    let first = document.querySelector('[class = "post-container"]');
    let makeNewPost = document.querySelector('[class = "add-post-form"]');
    if (!makeNewPost) {
        makeNewPost = document.createElement("div");
        makeNewPost.className = "add-post-form";
        makeNewPost.innerHTML = `
            <form id="new-post-form">
               <div class="post-add">
               <div class="first-post-raw">
                    <div class="first-post-column">
                        <img class="post-img" data-target="photoLink" id="photoLink" src="img/post_img.png" alt="">
                    </div>
                    <div class="second-post-column">
                        <div class="vendor-name" data-target="author">${user}</div>
                        <div class="validity-info">
                            <div class="validity-info-text">Offer is valid until</div>
                                <input type="date" id="validate-until-field" value="${view.postViewer.dateForm(new Date())}"></div>
                            <input id="description-field" placeholder="Enter post description"/>
                        </div>
                    </div>
               <div class="second-post-raw">
                    <input id="hashTags-field" placeholder="hashTag">
                    <input id="discount-field" placeholder="discount">
               </div>
            </div>
            <div class="add-new-post">
                <input type="submit" class="add-button" value="Add">
            </div>
            </form>`;
        container.insertBefore(makeNewPost, first);
        postEvent.setNewPostEventListener(makeNewPost);
        document.getElementById("new-post-form").onsubmit = () => {
            return false;
        }
    } else {
        makeNewPost.remove();
    }
}

function addNewPost() {
    let makeNewPost = document.querySelector('[class = "add-post-form"]');
    const validateUntil = document.getElementById('validate-until-field').value;
    const description = document.getElementById('description-field').value;
    const discount = document.getElementById('discount-field').value;
    const tagsStr = document.getElementById('hashTags-field').value;
    let tags = tagsStr.split(' ');
    let post = {};
    post.id = Date.now().toString(32) + (Math.random() * Math.pow(2, 20)).toString(32);
    post.description = description;
    post.author = view.getUser();
    post.createdAt = new Date();
    post.validateUntil = new Date(validateUntil);
    post.discount = discount;
    post.hashTags = tags;
    post.likes = [];
    post.comments = [];
    if (postsCollection.add(post)) {
        storage.setItem("post" + post.id, postsCollection.postToJSON(post));
        console.log(storage.getItem("post" + post.id));
        makeNewPost.remove();
        makePage(0, countPosts);
    } else {
        //add error message
    }
}

function createCommentArea(postId) {
    let post = document.getElementById(postId);
    let container = post.parentNode;
    let commentArea = document.querySelector('[class = "add-comment-form"]');
    if (!commentArea) {
        container.classList.add("post-dedicated");
        commentArea = document.createElement('div');
        commentArea.className = "add-comment-form";
        commentArea.innerHTML = `<div class="new-comment-area">
            <form id="new-comment-form">
               <input id="comment-text-input" placeholder="Add your comment">
            <div class="add-new-comment">
             <div class="review-buttons"></div>
                <input type="submit" class="add-button" value="Add">
            </div>
            </form>
            <div class="user-comments"></div>
        </div>`;
        container.appendChild(commentArea);
        _loadComments(postId);
        let mark = commentArea.querySelector('[class="review-buttons"]');
        drawReviewButtons(mark);
        let markVal;
        mark.addEventListener('click', () => {
            let button = event.target;
            let buttons = document.querySelectorAll('[class="review-button"]');
            let numb = button.id.substr(button.id.length - 1);
            markVal = numb;
            redrawReviewButtons(button.alt, buttons, numb);
        })
        let commentForm = document.getElementById("new-comment-form");
        commentForm.onsubmit = () => {
            return false;
        }
        commentForm.addEventListener("submit", () => {
            addComment(postId, markVal);
            commentForm.reset();
            let buttons = document.querySelectorAll('[class="review-button"]');
            redrawReviewButtons("star_pressed", buttons, 1);
        })
    } else {
        container.classList.remove("post-dedicated");
        commentArea.remove();
    }
}

function addComment(postId, markValue) {
    let commentData = {};
    let text = document.getElementById("comment-text-input");
    commentData.commentText = text.value;
    commentData.commentDate = new Date();
    commentData.commentMark = markValue;
    commentData.commentAuthor = view.getUser();
    if (postsCollection.addComment(postId, commentData)) {
        _reloadComments(postId);
        storage.setItem("post" + postId, postsCollection.postToJSON(postsCollection.get(postId)));
    }
}

function drawReviewButtons(mark) {
    for (let i = 1; i <= 5; i++) {
        let button = view.postViewer._drawPostButton("review-button", "star_unpressed");
        button.lastChild.id = "review-" + i;
        mark.appendChild(button);
    }
}

function redrawReviewButtons(button, buttons, mark) {
    if (button === "star_unpressed") {
        for (let i = 1; i <= mark; i++) {
            buttons[i - 1].lastChild.alt = "star_pressed";
            buttons[i - 1].lastChild.src = "img/star_pressed.png";
        }
    } else {
        if (+mark === 1) {
            for (let i = 1; i <= 5; i++) {
                if (buttons[i - 1].lastChild.alt === "star_pressed") {
                    buttons[i - 1].lastChild.alt = "star_unpressed";
                    buttons[i - 1].lastChild.src = "img/star_unpressed.png";
                } else {
                    break;
                }
            }
        } else {
            for (let i = +mark + 1; i <= 5; i++) {
                buttons[i - 1].lastChild.alt = "star_unpressed";
                buttons[i - 1].lastChild.src = "img/star_unpressed.png";
            }
        }
    }
}

function initializeFilter() {
    let date = new Date();
    const form = document.getElementById("filter");
    const createAtVal = document.getElementById("createdAt");
    if (createAtVal) {
        createAtVal.value = view.postViewer.dateForm(date);
    }
    const validateUntilVal = document.getElementById("validateUntil");
    if (validateUntilVal) {
        validateUntilVal.value = view.postViewer.dateForm(date);
    }
    form.onsubmit = () => {
        return false;
    };
    form.addEventListener("submit", () => {
        const filterConf = [];
        const author = document.getElementById("vendor-filter").value;
        if (author) {
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
        if (createAt) {
            filterConf.createAt = new Date(createAt);
        }
        const validateUntil = document.getElementById("validateUntil").value;
        if (validateUntil) {
            filterConf.validateUntil = new Date(validateUntil);
        }
        view.setFilter(filterConf);
        let filter = view.getFilter();
        makePage(0, 10, filter);
        form.reset();
    });
}

function initializeAddPostButton(user) {
    let button = document.getElementById("add-post");
    button.addEventListener("click", () => {
        initializeNewPostsArea(user);
    })
}

function makePage(firstPostNumber, postNumber, filter) {
    for (let i = 0; i < storage.length; i++) {
        postsCollection.add(postsCollection.JSONToPost(storage.getItem(storage.key(i))));
    }
    let posts = postsCollection.getPage(firstPostNumber, postNumber, filter);
    if (posts) {
        view.redrawPosts(posts);
    }
    initializeFilter();
    setPostEvents(posts);
    if (view.isAuthorized()) {
        let logOutBtn = document.querySelector('.logout-button');
        logOutBtn.removeEventListener('click', modals.createSingInModal);
        logOutBtn.addEventListener('click', modals.createLogOutModal);
        initializeAddPostButton(view.getUser());
    } else {
        let signInBtn = document.querySelector('.login-button');
        signInBtn.removeEventListener('click', modals.createLogOutModal);
        signInBtn.addEventListener('click', modals.createSingInModal);
    }
}

function readInputFieldsLogIn() {
    const username = document.getElementsByClassName('username-input').item(0).value;
    if (!username) {
        let warning = document.querySelector('[class="username-warning"]');
        if (warning) {
            warning.classList.add("show-warning");
        }
    }
    const password = document.getElementsByClassName('password').item(0).value;
    if (!password) {
        let warning = document.querySelector('[class="password-warning"]');
        if (warning) {
            warning.classList.add("show-warning");
        }
    }
    if (password && username) {
        const user = usersCollection.getUser(username, password);
        if (user) {
            view.fillUser(user.username);
            makePage(0, 10);
            toggleModal();
        } else {
            let warning = document.querySelector('[class="sign-in-warning"]');
            if (warning) {
                warning.classList.add("show-warning");
            }
        }
    }
}

function readInputFieldsEdit(postId) {
    let postEditions = [];
    const description = document.getElementById("description").value;
    if (description) {
        postEditions.description = description;
    }
    const discount = document.getElementById("discount").value;
    if (discount) {
        postEditions.discount = discount;
    }
    const tags = document.getElementById("hashTags").value;
    if (tags) {
        postEditions.hashTags = tags.split(" ");
    }
    const validateUntil = document.getElementById("validateUntil").value;
    if (validateUntil) {
        postEditions.validateUntil = new Date(validateUntil);
    }
    postsCollection.edit(postId, postEditions);
    storage.setItem("post" + postId, postsCollection.postToJSON(postsCollection.get(postId)));
    makePage(0, 10);
    toggleModal();
}

function loadNextPosts() {
    if (postsCollection.countPosts() / 10 + 1 >= +page.textContent + 1) {
        makePage(skippedPost + countPosts, countPosts + 10);
        skippedPost += 10;
        page.textContent++;
    }
}

function loadPreviousPosts() {
    if (+page.textContent - 1 > 0) {
        makePage(skippedPost - countPosts, countPosts - 10);
        skippedPost -= 10;
        page.textContent--;
    }
}

function setPostEvents(posts) {
    posts.forEach(post => {
        let postElem = document.getElementById(post.id);
        postEvent.setPostEventListener(postElem, post.id);
    })
}

function _loadComments(postId) {
    let post = postsCollection.get(postId);
    let commArr = document.querySelector('[class="user-comments"]');
    if (post.comments) {
        post.comments.reverse();
        post.comments.forEach(comment => {
            let comm = document.createElement("div");
            commArr.appendChild(comm);
            comm.className = "comment-holder";
            comm.innerHTML = `
 
            <div class="first-comment-raw">
                <div id="comment-author"></div>
                <div id="date-comment"></div>
            </div>
            <div class="second-comment-raw">
                <div id="comment-text"></div>
                <div id="comment-mark"></div>
            </div> 
`;
            _fillComment(comment, comm);
        })
    }
}

function _reloadComments(postId) {
    let commArr = document.querySelector('[class="user-comments"]');
    if (commArr) {
        while (commArr.lastChild) {
            commArr.removeChild(commArr.lastChild);
        }
    }
    _loadComments(postId);
}

function _fillComment(comment, comm) {
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

next.addEventListener('click', loadNextPosts);
prev.addEventListener('click', loadPreviousPosts);







