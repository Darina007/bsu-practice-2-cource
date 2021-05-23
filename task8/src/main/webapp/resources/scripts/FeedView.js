class FeedView {
    postViewer = new PostView(true);
    users;
    filter = [];

    async constructor(posts, users, userData) {
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
            await this.drawPosts(posts);
        }
    }

    async isAuthorized() {
        return !!this.postViewer.userName;
    }

    async getUser() {
        return this.postViewer.userName;
    }

    async fillUser(user) {
        let userName = document.getElementById("user-name");
        userName.textContent = user;
        let button = document.getElementById("login-button");
        button.className = "logout-button"
        button.id = "logout-button";
        button.textContent = "Log out";
        this.postViewer.userName = user;
        this.postViewer.isGuest = false;
        await this.drawAddPostButton();
    }

    async unFillUser() {
        let userName = document.getElementById("user-name");
        userName.textContent = "Guest";
        let button = document.getElementById("logout-button");
        button.className = "login-button";
        button.id = "login-button";
        button.textContent = "Log in";
        this.postViewer.userName = null;
        this.postViewer.isGuest = true;
        await this.deleteAddPostButton();
    }

    drawAddPostButton() {
        let field = document.getElementById("container");
        let button = document.createElement("button");
        button.className = "add-post";
        button.id = "add-post";
        button.textContent = "new post";
        let img = document.createElement("img");
        img.alt = "add";
        img.src = "resources/img/add.png";
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

    async setFilter(filter) {
        let filterFields = Object.keys(filter);
        filterFields.forEach((field) => {
                this.filter[field] = filter[field];
            }
        )
    }

    async clearFilter() {
        this.filter = [];
    }

    async getFilter() {
        return this.filter;
    }

    async fillFilterUser(users) {
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

    async drawPosts(posts) {
        await posts.reverse().forEach((post) => this.postViewer.drawPost(post));
    }

    async redrawPosts(posts) {
        let oldPosts = this.postViewer.feedPosts.querySelectorAll("div.post-container");
        Array.prototype.forEach.call(oldPosts, (oldPost) => this.postViewer.feedPosts.removeChild(oldPost));
        await this.drawPosts(posts);
    }

    _createOption(user) {
        let option = document.createElement('option');
        option.textContent = user;
        return option;
    }
}


(async () => {
    window.view = new FeedView();
    await window.view.fillUser('Darroman');
    let users = ['Darroman', 'Ivanov Ivan', 'Solovieva Evgeniya', 'Popova Ksenia',
        'Sokolov Ivan', 'Jonathan Trapp', 'Lylalyuk Anna', 'Novikov Alexey',
        'Just furniture', 'Ivanov Alexander', 'Player', 'Kitty_love', 'Mazhey Victor'];
    await window.view.fillFilterUser(users);
})();

