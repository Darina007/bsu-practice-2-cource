class FeedView {
    postViewer = new PostView(true);

    constructor(posts, users, userData) {
        if (userData.author) {
            this.postViewer.isGuest = false;
            this.postViewer.userName = userData.author;
            this.fillUser(userData.author);
        }
        this.fillFilter(users);
        this.drawPosts(posts);
    }

    isAuthorized() {
        return !!this.postViewer.userName;
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
        field.appendChild(button);
    }

    deleteAddPostButton() {
        let field = document.getElementById("container");
        let button = document.getElementById("add-post");
        if (button) {
            field.removeChild(button);
        }
    }

    fillFilter(users) {
        let filter = document.getElementById('vendor__filter');
        users.forEach((user) => filter.appendChild(this._createOption(user)));
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