class FeedView {
    postViewer = new PostView(true);
    constructor(posts, users, userData) {
        if (userData.author) {
            this.postViewer.isGuest = false;
            this.postViewer.userName = userData.author;
        }
        this.fillFilter(users);
        this.drawPosts(posts);
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