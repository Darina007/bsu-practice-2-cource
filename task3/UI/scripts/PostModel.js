class PostModel {
    _posts = new Map();

    constructor(posts) {
        this._posts = new Map(posts.map((post) => [post.id, post]));
    }

    get(id) {
        return this._posts.has(id) ? this._posts.get(id) : null;
    }

    getPage(skip, top, filterConfig) {
        let countSkippedPosts = skip || 0;
        let countReceivedPosts = top || 10;
        let workingArray = [...this._posts];
        if (filterConfig) {
            if (filterConfig.author) {
                workingArray = workingArray.filter(value => value.author === filterConfig.author)
            }
            if (filterConfig.createdAt) {
                workingArray = workingArray.filter(value => {
                    return value.createdAt.getDate() === filterConfig.createdAt.getDate()
                        && value.createdAt.getMonth() === filterConfig.createdAt.getMonth()
                        && value.createdAt.getFullYear() === filterConfig.createdAt.getFullYear();
                })
            }
            if (filterConfig.tag) {
                workingArray = workingArray.filter(value => {
                    let flag = false;
                    value.hashTags.forEach(tag => {
                            if (filterConfig.tag.includes(tag)) {
                                flag = true;
                            }
                        }
                    )
                    return flag;
                })
            }
            if (filterConfig.validateUntil) {
                workingArray = workingArray.filter(value => value.validateUntil >= filterConfig.validateUntil)
            }
            if (filterConfig.discount) {
                workingArray = workingArray.filter(value => value.discount >= filterConfig.discount)
            }
            if (filterConfig.rating) {
                workingArray = workingArray.filter(value => value.rating >= filterConfig.rating)
            }
        }

        workingArray.sort((firstPost, secondPost) => secondPost.createdAt - firstPost.createdAt);
        workingArray = workingArray.slice(countSkippedPosts, countSkippedPosts + countReceivedPosts);
        return workingArray;
    }

    add(post) {
        if (PostModel._validate(post) && !this._posts.has(post.id)) {
            this._posts.set(post.id, post);
            return true;
        }
        return false;
    }

    addAll(posts) {
        posts.forEach((post) => this.add(post));
    }

    edit(id, changes) {
        let mutablePost;
        if (this._posts.has(id)) {
            mutablePost = Object.assign(this._posts.get(id));
        }
        let mutableFields = Object.keys(changes);
        if (mutablePost) {
            mutableFields.forEach((field) => {
                    if (field !== 'id' && field !== 'createdAt' && field !== 'author') {
                        mutablePost[field] = changes[field];
                    }
                }
            )
            if (PostModel._validate(mutablePost) && this._posts.get(id)) {
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

    remove(id) {
        if (this._posts.has(id)) {
            this._posts.delete(id);
            return true;
        }
        return false;
    }

    clear() {
        this._posts.clear();
    }
}