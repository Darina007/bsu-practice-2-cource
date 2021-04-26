class FeedView {
    postViewer = new PostView(true);
    users;
    filter = [];

    constructor(posts, users, userData) {
        if (userData) {
            this.postViewer.isGuest = false;
            this.fillUser(userData);
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

    fillUser(user) {
        if (user) {
            let userName = document.getElementById("user-name");
            userName.textContent = user;
            let button = document.getElementById("login-button");
            button.className = "logout-button"
            button.id = "logout-button";
            button.textContent = "Log out";
            this.postViewer.userName = user;
            this.postViewer.isGuest = false;
        }
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
    }

    getFilter() {
        return this.filter;
    }

    fillFilterUser(users) {
        let filter = document.getElementById('vendor__filter');
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
        let oldPosts = this.postViewer.feedPosts.querySelectorAll("div.post");
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
    //window.view.fillUser("Иванов Иван");
})();

