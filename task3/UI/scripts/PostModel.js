class PostModel {
    constructor(posts) {
        if (posts) {
            this._posts = posts.slice();
        } else {
            this._posts = [];
        }
    }

    countPosts() {
        return this._posts.length;
    }

    get(id) {
        return this._posts.find((item) => item.id === id);
    }

    getCountPosts() {
        return this._posts.length;
    }

    getPage(skip, top, filterConfig) {
        let countSkippedPosts = skip || 0;
        let countReceivedPosts = top || 10;
        let workingArray = [...this._posts];
        if (filterConfig) {
            if (filterConfig.author) {
                workingArray = workingArray.filter(value => value.author === filterConfig.author);
                workingArray.sort((firstPost, secondPost) => secondPost.author - firstPost.author);
            }
            if (filterConfig.createdAt) {
                workingArray = workingArray.filter(value => {
                    return value.createdAt.getDate() === filterConfig.createdAt.getDate()
                        && value.createdAt.getMonth() === filterConfig.createdAt.getMonth()
                        && value.createdAt.getFullYear() === filterConfig.createdAt.getFullYear();
                });
                workingArray.sort((firstPost, secondPost) => secondPost.createdAt - firstPost.createdAt);
            }
            if (filterConfig.hashTags) {
                workingArray = workingArray.filter(value => {
                    let flag = false;
                    filterConfig.hashTags.forEach(tag => {
                        if (value.hashTags.includes(tag)) {
                            flag = true;
                        }
                    })
                    return flag;
                });
                workingArray.sort((firstPost, secondPost) => secondPost.createdAt - firstPost.createdAt);
            }
            if (filterConfig.validateUntil) {
                workingArray = workingArray.filter(value => value.validateUntil >= filterConfig.validateUntil);
                workingArray.sort((firstPost, secondPost) => firstPost.validateUntil - secondPost.validateUntil);
            }
            if (filterConfig.discount) {
                workingArray = workingArray.filter(value => value.discount >= filterConfig.discount);
                workingArray.sort((firstPost, secondPost) => secondPost.discount - firstPost.discount);
            }
            if (filterConfig.rating) {
                workingArray = workingArray.filter(value => value.rating >= filterConfig.rating);
                workingArray.sort((firstPost, secondPost) => secondPost.rating - firstPost.rating);
            }
        } else {
            workingArray.sort((firstPost, secondPost) => secondPost.createdAt - firstPost.createdAt);
        }
        workingArray = workingArray.slice(countSkippedPosts, countSkippedPosts + countReceivedPosts);
        return workingArray;
    }

    add(post) {
        if (PostModel._validate(post) && !this.get(post.id)) {
            this._posts.push(post);
            return true;
        }
        return false;
    }

    addFromStorage(postDate) {
        let post = [];
        post.description = postDate.description;
        post.createdAt = new Date(postDate.createdAt);
        post.validateUntil = new Date(postDate.validateUntil);
        post.author = postDate.author;
        post.photoLink = postDate.photoLink;
        post.hashTags = postDate.hashTags;
        post.discount = postDate.discount;
        post.rating = postDate.rating;
        post.likes = postDate.likes;
        post.comments = postDate.comments;
        this.add(post);
    }

    addAll(posts) {
        posts.forEach((post) => this.add(post));
    }

    edit(id, changes) {
        let mutablePost;
        if (this.get(id)) {
            mutablePost = Object.assign(this.get(id));
        }
        let mutableFields = Object.keys(changes);
        if (mutablePost) {
            mutableFields.forEach((field) => {
                    if (field !== 'id' && field !== 'createdAt' && field !== 'author') {
                        mutablePost[field] = changes[field];
                    }
                }
            )
            if (PostModel._validate(mutablePost) && this.get(id)) {
                let index = this._posts.indexOf(this.get(id));
                if (index !== -1) {
                    this._posts.splice(index, 1, mutablePost);
                }
                return true;
            }
        }
        return false;
    }

    static _validate(post) {
        let flag = false;
        if (post.id && post.description
            && post.author && post.createdAt
            && (post.validateUntil - post.createdAt) > 0
            && post.discount > 0 && post.discount <= 100) {
            if (post.author.length !== 0 && post.description.length < 200) {
                flag = true;
            }
        }
        return flag;
    }

    static _validateComment(comment) {
        if (!comment.commentAuthor) {
            return false;
        }
        if (!comment.commentDate) {
            return false;
        }
        if (!comment.commentText) {
            return false;
        }
        if (!comment.commentMark) {
            return false;
        }
        return true;
    }

    addComment(id, commentData) {
        let post = this.get(id);
        if (PostModel._validateComment(commentData)) {
            post.comments.push(commentData);
            return true;
        }
        return false;
    }

    removePost(id) {
        if (this.get(id)) {
            let index = this._posts.indexOf(this.get(id));
            this._posts.splice(index, 1, this.get(id));
            return true;
        }
        return false;
    }

    clear() {
        this._posts = [];
    }

    postToJSON(post) {
        if (!PostModel._validate(post)) {
            return;
        }
        return JSON.stringify(post);
    }

    JSONToPost(post) {
        let postObj = JSON.parse(post);
        if (postObj.comments) {
            postObj.comments.forEach(commentData => {
                commentData.commentDate = new Date(commentData.commentDate);
            })
        } else {
            postObj.comments = [];
        }
        postObj.validateUntil = new Date(postObj.validateUntil);
        postObj.createdAt = new Date(postObj.createdAt);
        return postObj;
    }
}

(() => {
    window.postsCollection = new PostModel();
})();