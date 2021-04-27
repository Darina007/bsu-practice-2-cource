let modal = document.querySelector('.modal');
let next = document.querySelector('.navigation__page__next');
let prev = document.querySelector('.navigation__page__prev');
let page = document.getElementById('page');
let skippedPost = 0;
let countPosts = 10;

function toggleModal() {
    modal.classList.toggle('show-modal');
}

function initializeNewPostsArea(user) {
    const makeNewPost = document.getElementById("add-post-container");
    makeNewPost.innerHTML = `
        <div class="make-new-post-area">
            <form id="new-post-form">
                <div class="column-with-user-photo">
                    <img class="user-photo" src="${user.photoLink}" alt="User photo" >
                </div>
    
                <div class="column-2">
                    <div id="add-new-post">
                        <label>
                            <textarea id="new-post-textarea" placeholder="The text of your post..."
                                          maxlength="280" spellcheck="true"></textarea>
                            <textarea id="tags-area" placeholder="Your tags..."></textarea>
                        </label>
                    </div>
                    <div class="action-area">
                        <div class="add-photo-area">
                            <a href="#" class="upload-a-photo" title="Upload a Photo">
                                <img class="add-photo" src="resources/img/add-image.png" alt="Add photo" >
                            </a>
                        </div>
                        <div class="add-new-post">
                            <input type="submit" class="add-post-button" value="Add">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `;
    window.postEvent.setNewPostEventListener(makeNewPost);
    document.getElementById("new-post-form").onsubmit = () => {
        return false;
    }
}

function initializeFilter() {
    const form = document.getElementById("filter");
    form.onsubmit = () => {
        return false;
    };
    form.addEventListener("submit", e => {
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
        window.view.setFilter(filterConf);
        let posts = window.postsCollection.getPage(0, 10, window.view.getFilter());
        window.view.redrawPosts(posts);
    })
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

function makePage(firstPostNumber, postNumber) {
    let posts = window.postsCollection.getPage(firstPostNumber, postNumber);
    if (posts) {
        window.view.redrawPosts(posts);
    }
    initializeFilter();
    if (window.view.isAuthorized()) {
        let logOutBtn = document.querySelector('.logout-button');
        logOutBtn.removeEventListener('click', window.modals.createSingInModal);
        logOutBtn.addEventListener('click', window.modals.createLogOutModal);
        setPostEvents(posts);
    } else {
        let signInBtn = document.querySelector('.login-button');
        signInBtn.removeEventListener('click', window.modals.createLogOutModal);
        signInBtn.addEventListener('click', window.modals.createSingInModal);
    }
}

function readInputFields() {
    const username = document.getElementsByClassName('username-input').item(0).value;
    const password = document.getElementsByClassName('password').item(0).value;
    const user = window.usersCollection.getUser(username, password);
    if (user) {
        window.view.fillUser(user.username);
        makePage(0, 10);
    }
    toggleModal();
}

function loadNextPosts() {
    if (window.postsCollection.countPosts() / 10 + 1 >= +page.textContent + 1) {
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
        window.postEvent.setPostEventListener(postElem, post.id);
    })
}

function addNewPost() {
    const postText = document.getElementById('new-post-textarea').value;
    const tagsStr = document.getElementById('tags-area').value;
    let tags = tagsStr.split(' ');
    let post = {};
    post.id = Date.now().toString(32) + (Math.random() * Math.pow(2, 20)).toString(32);
    post.description = postText;
    post.author = window.view.user.username;
    post.photoLink = window.view.user.photoLink;
    post.createAt = new Date();
    post.tags = tags;
    post.likes = [];
    if (window.postsCollection.add(post)) {
        makePage(0, countPosts);
    }
}

next.addEventListener('click', loadNextPosts);
prev.addEventListener('click', loadPreviousPosts);







