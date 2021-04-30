class FeedView {
    postViewer = new PostView(true);
    users;
    filter = [];

    constructor(posts, users, userData) {
        if (userData) {
            this.postViewer.isGuest = false;
            this.fillUser(userData);
            this.drawAddPostButton();
        }
        this.users = users;
        if (users) {
            this.fillFilterUser(users);
        }
        if (posts) {
            this.drawPosts(posts);
        }
    }

    isAuthorized() {
        return !!this.postViewer.userName;
    }

    getUser() {
        return this.postViewer.userName;
    }

    fillUser(user) {
        let userName = document.getElementById("user-name");
        userName.textContent = user;
        let button = document.getElementById("login-button");
        button.className = "logout-button"
        button.id = "logout-button";
        button.textContent = "Log out";
        this.postViewer.userName = user;
        this.postViewer.isGuest = false;
        this.drawAddPostButton();
    }

    unFillUser() {
        let userName = document.getElementById("user-name");
        userName.textContent = "Guest";
        let button = document.getElementById("logout-button");
        button.className = "login-button";
        button.id = "login-button";
        button.textContent = "Log in";
        this.postViewer.userName = null;
        this.postViewer.isGuest = true;
        this.deleteAddPostButton();
    }

    drawAddPostButton() {
        let field = document.getElementById("container");
        let button = document.createElement("button");
        button.className = "add-post";
        button.id = "add-post";
        button.textContent = "new post";
        let img = document.createElement("img");
        img.alt = "add";
        img.src = "img/add.png";
        button.appendChild(img);
        field.appendChild(button);
    }

    deleteAddPostButton() {
        let field = document.getElementById("container");
        let button = document.getElementById("add-post");
        if (button) {
            field.removeChild(button);
        }
    }

    setFilter(filter) {
        if (filter.author !== "all vendors") {
            this.filter.author = filter.author;
        }
        if (filter.createdAt) {
            this.filter.createdAt = filter.createdAt;
        }
        if (filter.validateUntil) {
            this.filter.validateUntill = filter.validateUntil;
        }
        if (filter.discount) {
            this.filter.discount = filter.discount;
        }
        if (filter.rating) {
            this.filter.rating = filter.rating;
        }
        if (filter.hashTags) {
            this.filter.hashTags = filter.hashTags;
        }
    }

    clearFilter() {
        this.filter = [];
    }

    getFilter() {
        return this.filter;
    }

    fillFilterUser(users) {
        let filter = document.getElementById('vendor-filter');
        users.forEach((user) => filter.appendChild(this._createOption(user)));
    }

    addNewUser(user) {
        if (!this.users.find(user)) {
            this.users.add(user);
        }
    }

    addNewUsers(users) {
        if (!this.users) {
            this.users = users.slice();
        } else {
            users.forEach(user => {
                if (!this.users.find(user)) {
                    this.users.add(user);
                }
            });
        }
    }

    drawPosts(posts) {
        posts.reverse().forEach((post) => this.postViewer.drawPost(post));
    }

    redrawPosts(posts) {
        let oldPosts = this.postViewer.feedPosts.querySelectorAll("div.post-container");
        Array.prototype.forEach.call(oldPosts, (oldPost) => this.postViewer.feedPosts.removeChild(oldPost));
        this.drawPosts(posts);
    }

    _createOption(user) {
        let option = document.createElement('option');
        option.textContent = user;
        return option;
    }
}


(() => {
    window.view = new FeedView();
    window.view.fillUser('Darroman');
    let users = ['Darroman', 'Иванов Иван', 'Соловьева Евгения', 'Попова Ксения',
        'Соколов Иван', 'Джонатан Трапп', 'Lylalyuk Anna', 'Новиков Алексей',
        'Просто мебель', 'Иванов Александр', 'Player', 'Kitty_love', 'Мажей Виктор'];
    window.view.fillFilterUser(users);
})();

