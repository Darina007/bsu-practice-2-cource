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
        if (!this.isGuest) {
            if (this.userName === postData.author) {
                this._drawAuthorPostButtons(newPost);
            }
            this._drawUserPostButtons(newPost, false);
        } else {
            this._drawUserPostButtons(newPost, true);
        }
        this.feedPosts.insertBefore(newPost, this.feedPosts.firstChild);
    }

    //something wrong
    redrawPost(id, newPostData) {
        let oldPost = document.getElementById(id);
        let newPost = document.importNode(this._postTemplate.content, true);
        this._fillPostData(newPost, newPostData);
        let article = newPost.querySelector("div.post");
        // if (!this.isGuest) {
        //     article.appendChild(this._drawLike());
        // } else if (this.userName === newPost.author) {
        //     article.appendChild(this._drawAuthorPostButtons());
        // }
        this.feedPosts.replaceChild(newPost, oldPost);
    }

    pressLike(postId) {
        const username = this.userName;
        const post = document.getElementById(postId);
        const postCol = window.postsCollection.get(postId);
        const likeIndex = postCol.likes.indexOf(username);
        if (likeIndex === -1) {
            postCol.likes.push(username);
            this.updateLike(post);
        } else {
            postCol.likes.splice(likeIndex, 1);
            this.updateLike(post);
        }
    }

    updateLike(post) {
        let like = post.querySelector('[class="like"]');
        if (like.getAttribute("alt") === "like") {
            like.src = "img/liked.png";
            like.alt = "unlike";
        } else {
            like.src = "img/like.png";
            like.alt = "like";
        }
    }

    deletePost(id) {
        let post = document.getElementById(id);
        this.feedPosts.removeChild(post);
    }

    _fillPostData(newPost, postData) {
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
        discount.textContent = postData.discount + "%";
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

    _drawAuthorPostButtons(newPost) {
        let lastTag = newPost.querySelector('[class="post__info__hashtags"]');
        let buttonDelete = this._drawPostButton("delete");
        let buttonEdit = this._drawPostButton("edit");
        lastTag.appendChild(buttonDelete);
        lastTag.appendChild(buttonEdit);
        return lastTag;
    }

    _drawUserPostButtons(newPost, isGuest) {
        let lastTag = newPost.querySelector('[class="review"]');
        if (!isGuest) {
            let buttonLike = this._drawPostButton("like", "like");
            let buttonComment = this._drawPostButton("comment", "comment");
            lastTag.appendChild(buttonLike);
            lastTag.appendChild(buttonComment);
        } else {
            let buttonComment = this._drawPostButton("comment", "view comments");
            lastTag.appendChild(buttonComment);
        }
        return lastTag;
    }

    _drawPostButton(type, buttonText) {
        let button = document.createElement("button");
        button.className = type;
        if (buttonText) {
            button.textContent = buttonText;
        }
        let image = document.createElement("img");
        image.src = "img/" + type + ".png";
        image.alt = type;
        button.appendChild(image);
        return button;
    }
}