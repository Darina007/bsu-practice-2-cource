class PostService {
    constructor(posts) {
        if (posts) {
            this._posts = posts.slice();
        } else {
            this._posts = [];
        }
    }

    get(id) {
        return this._posts.find((item) => item.id === id);
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
        return Promise.resolve(workingArray);
    }

    add(post) {
        if (PostService._validate(post) && !this.get(post.id)) {
            this._posts.push(post);
            return true;
        }
        return false;
    }

    async addAll(posts) {
        await posts.forEach(post => {
            post.validateUntil = new Date(post.validateUntil);
            post.createdAt = new Date(post.createdAt);
            this.add(post);
        })
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
            if (PostService._validate(mutablePost) && this.get(id)) {
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

    removePost(id) {
        if (this.get(id)) {
            let index = this._posts.indexOf(this.get(id));
            this._posts.splice(index, 1, this.get(id));
            return true;
        }
        return false;
    }

    addComment(id, commentData) {
        let post = postServise.get(id);
        if (PostService._validateComment(commentData)) {
            if (!post.comments) {
                post.comments = [];
            }
            post.comments.push(commentData);
            return true;
        }
        return false;
    }

    static _validateComment(comment) {
        return comment.commentAuthor || comment.commentDate ||
            comment.commentText || comment.commentMark;
    }

    parseComments(commentsArray) {
        if (commentsArray) {
            commentsArray.forEach(comment => {
                commentsArray.commentDate = new Date(comment.commentDate);
            })
        } else {
            commentsArray = [];
        }
        return commentsArray;
    }

    async deletePost(url, id) {
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        });
        return response.status;
    }

    async editPost(url, id, editFields) {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                description: editFields.description,
                discount: editFields.discount,
                hashTags: editFields.hashTags,
                validateUntil: editFields.validateUntil,
            })
        });
        return response.status;
    }

    async postLike(postId, url) {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: postId, author: view.getUser()})
        });
        return response.status;
    }

    async _postNewPost() {
        let newPost = await addPostEvent.fillNewPostData();
        let image = document.getElementById('img-file');
        let responseUploadingPhoto = await postServise.postPhoto(image.files[0], "/upload");
        if (responseUploadingPhoto !== 200) {
            addPostEvent.removePostArea();
            modals.createErrorModal("Error adding photo on service");
        }
        let response = await postServise.postData(newPost, "/post");
        if (response !== 200) {
            addPostEvent.removePostArea();
            modals.createErrorModal("Error adding post on service");
        }
        if (!await postServise.add(newPost)) {
            addPostEvent.removePostArea();
            modals.createErrorModal("Error adding post");
            return;
        }
        addPostEvent.removePostArea();
        await feedEvents.makePage(feedEvents.skippedPost, feedEvents.countPosts);
    }

    async _updateLike(postId) {
        let response = await postServise.postLike(postId, "/post/update/like");
        if (response !== 200) {
            modals.createErrorModal("Error updating like");
            return;
        }
        await view.postViewer.pressLike(postId);
    }

    async getPosts(param, url) {
        let response = await fetch(url + "?" + param, {
            method: 'GET'
        });
        return response.json();
    }

    async postData(postData, url) {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        return response.status;
    }

    async postPhoto(photo, url) {
        let formData = new FormData();
        formData.append("image", photo, photo.name);
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        return response.status;
    }

    async postComment(data, url) {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.status;
    }

    async JSONToPost(post) {
        let postObj = JSON.parse(post);
        postObj.validateUntil = new Date(postObj.validateUntil);
        postObj.createdAt = new Date(postObj.createdAt);
        await postServise.parseComments(post.comments);
        return postObj;
    }
}

(() => {
    window.postServise = new PostService();
})();