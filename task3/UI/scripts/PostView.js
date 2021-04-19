class PostView {
    isGuest = true;
    userName;
    feedPosts = document.querySelector('div.section__data');
    _postTemplate = document.getElementById('post__template');

    constructor(isGuest, userName) {
        this.isGuest = isGuest;
        if (!isGuest) {
            this.userName = userName;
        }
    }

    drawPost(postData) {
        let newPost = document.importNode(this._postTemplate.content, true);
        this._fillPostData(newPost, postData);
        let article = newPost.querySelector('div.post');
        if (this.isGuest) {
            article.appendChild(this._drawLike());
        } else if (this.userName === postData.author) {
            this._drawPostButtons();
        }
        this.feedPosts.insertBefore(newPost, this.feedPosts.firstChild);
    }

    redrawPost(id, newPostData) {
        let oldPost = document.getElementById(id);
        let newPost = document.importNode(this._postTemplate.content, true);
        this._fillPostData(newPost, newPostData);
        let article = newPost.querySelector("div.post");
        if (!this.isGuest) {
            article.appendChild(this._drawLike());
        } else if (this.userName === newPost.author) {
            article.appendChild(this._drawPostButtons());
        }
        this.feedPosts.replaceChild(newPost, oldPost);
    }

    deletePost(id) {
        let post = document.getElementById(id);
        this.feedPosts.removeChild(post);
    }

    _fillPostData(newPost, postData) {
        console.log(newPost);
        let article = newPost.querySelector('div.post');
        article.id = postData.id;
        let photo = newPost.querySelector('[data-target = "photoLink"]');
        photo.src = postData.photoLink;
        let author = newPost.querySelector('[data-target = "author"]');
        author.textContent = postData.author;
        let validUntil = newPost.querySelector('[data-target = "validateUntil"]');
        validUntil.textContent = postData.validateUntil.toDateString();
        let description = newPost.querySelector('[data-target="description"]');
        description.textContent = postData.description;
        let discount = newPost.querySelector('[data-target="discount"]');
        discount.textContent = postData.discount+"%";
        let rating = newPost.querySelector('[data-target="rating"]');
        rating.textContent = postData.rating;
        let tags = newPost.querySelector('[data-target="hashTags"]');
        postData.hashTags.forEach((tag) => tags.appendChild(this._createTag(tag)));
    }

    _createTag(tagText) {
        let tag = document.createElement('li');
        tag.className = "hashtag";
        tag.textContent = "#" + tagText;
        return tag;
    }

    _drawLike() {
        let like = document.createElement('button');
        like.className = "like";

        let image = document.createElement('img');
        image.src = "../img/like.png";
        image.alt = "like";

        like.appendChild(image);
        return like;
    }

    _drawPostButtons() {
        let lastTag = document.querySelector(".post__info__hashtags");
        let buttonDelete = this._drawPostButton("delete");
        let buttonEdit = this._drawPostButton("edit");
        lastTag.appendChild(buttonDelete);
        lastTag.appendChild(buttonEdit);
        return lastTag;
    }

    _drawPostButton(type) {
        let button = document.createElement("button");
        button.className = type;
        let image = document.createElement("img");
        image.src = "img/" + type + ".png";
        image.alt = type;
        button.appendChild(image);
        return button;
    }
}