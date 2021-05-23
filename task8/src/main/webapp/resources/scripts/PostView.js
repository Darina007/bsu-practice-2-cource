class PostView {
    isGuest = true;
    userName;
    feedPosts = document.querySelector('div.section-data');
    _postTemplate = document.getElementById('post-template');

    constructor(isGuest, userName) {
        this.isGuest = isGuest;
        if (!isGuest) {
            this.userName = userName;
        }
    }

    drawPost(postData) {
        let newPost = document.importNode(this._postTemplate.content, true);
        this._fillPostData(newPost, postData);
        this.drawButtons(newPost, postData);
        this.feedPosts.insertBefore(newPost, this.feedPosts.firstChild);
    }

    drawButtons(newPost, postData){
        if (!this.isGuest) {
            if (this.userName === postData.author) {
                this._drawAuthorPostButtons(newPost);
            }
            this._drawUserPostButtons(newPost, false);
        } else {
            this._drawUserPostButtons(newPost, true);
        }
    }

    async pressLike(postId) {
        const username = this.userName;
        const post = document.getElementById(postId);
        const postCol = postServise.get(postId);
        const likeIndex = postCol.likes.indexOf(username);
        if (likeIndex === -1) {
            postCol.likes.push(username);
        } else {
            postCol.likes.splice(likeIndex, 1);
        }
        await this.updateLike(post);
    }

    async updateLike(post) {
        let button = post.querySelector('[class="like"]');
        let like = button.querySelector("img");
        if (like.getAttribute("alt") === "like") {
            like.src = "resources/img/unlike.png";
            like.alt = "unlike";
        } else {
            like.src = "resources/img/like.png";
            like.alt = "like";
        }
    }

    async deletePost(id) {
        let post = document.getElementById(id);
        await this.feedPosts.removeChild(post.parentNode);
    }

    _fillPostData(newPost, postData) {
        let article = newPost.querySelector('div.post');
        article.id = postData.id;
        let photo = newPost.querySelector('[data-target = "photoLink"]');
        if (postData.photoLink) {
            photo.src = "resources/uploads/" + postData.photoLink;
        }
        let author = newPost.querySelector('[data-target = "author"]');
        author.textContent = postData.author;
        let validUntil = newPost.querySelector('[data-target = "validateUntil"]');
        let dateReverse = this.dateForm(postData.validateUntil);
        let dateArr = dateReverse.split("-");
        dateArr = dateArr.reverse();
        validUntil.textContent = dateArr.join(".");
        let description = newPost.querySelector('[data-target="description"]');
        description.textContent = postData.description;
        let discount = newPost.querySelector('[data-target="discount"]');
        discount.textContent = postData.discount + "%";
        let rating = newPost.querySelector('[data-target="rating"]');
        this._drawRating(rating, postData.rating);
        let tags = newPost.querySelector('[data-target="hashTags"]');
        postData.hashTags.forEach((tag) => tags.appendChild(this._createTag(tag)));
    }

    _drawRating(placeHolder, rating) {
        let img;
        for (let i = 1; i <= 5; i++) {
            if (rating > 0) {
                img = this._createImage("star_pressed");
            } else {
                img = this._createImage("star_unpressed");
            }
            placeHolder.appendChild(img);
            rating--;
        }
    }

    _createTag(tagText) {
        let tag = document.createElement('li');
        tag.className = "hashtag";
        tag.textContent = "#" + tagText;
        return tag;
    }

    _drawAuthorPostButtons(newPost) {
        let lastTag = newPost.querySelector('[class="second-post-raw"]');
        let buttonDelete = this._drawPostButton("delete", "delete");
        let buttonEdit = this._drawPostButton("edit", "edit");
        lastTag.appendChild(buttonDelete);
        lastTag.appendChild(buttonEdit);
        return lastTag;
    }

    _drawUserPostButtons(newPost, isGuest) {
        let lastTag = newPost.querySelector('[class="review"]');
        let post = newPost.querySelector('[class="post"]');
        if (!isGuest) {
            const postCol = postServise.get(post.id);
            const likeIndex = postCol.likes.indexOf(this.userName);
            let buttonLike;
            if (likeIndex === -1) {
                buttonLike = this._drawPostButton("like", "like", "like");
            } else {
                buttonLike = this._drawPostButton("like", "unlike", "like");
            }
            let buttonComment = this._drawPostButton("comment", "comment", "comment");
            lastTag.appendChild(buttonLike);
            lastTag.appendChild(buttonComment);
        } else {
            let buttonComment = this._drawPostButton("comment", "comment", "view comments");
            lastTag.appendChild(buttonComment);
        }
        return lastTag;
    }

    _drawPostButton(type, imgName, buttonText) {
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        if (buttonText) {
            button.textContent = buttonText;
        }
        button.className = type;
        let image = this._createImage(imgName);
        button.appendChild(image);
        return button;
    }

    _createImage(imgName) {
        let image = document.createElement("img");
        image.src = "resources/img/" + imgName + ".png";
        image.alt = imgName;
        return image;
    }

    dateForm(date) {
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
            + '-' + ('0' + (date.getDate() + 1)).slice(-2);
    }
}