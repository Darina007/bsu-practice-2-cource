class FeedEvents {
    next = document.querySelector('.navigation-page-next');
    prev = document.querySelector('.navigation-page-prev');
    page = document.getElementById('page');
    skippedPost = 0;
    countPosts = 10;

    initializeFilter() {
        const form = document.getElementById("filter");
        feedEvents.fillDateFilterFields();
        form.onsubmit = () => {
            return false;
        };
        form.addEventListener("submit", () => {
            view.clearFilter();
            const filterConf = feedEvents.fillFilter();
            view.setFilter(filterConf);
            let filter = view.getFilter();
            feedEvents.makePage(0, 10, filter).then();
            form.reset();
            feedEvents.fillDateFilterFields();
        });
    }

    fillDateFilterFields() {
        const createAtVal = document.getElementById("createdAt");
        if (createAtVal) {
            createAtVal.value = view.postViewer.dateForm(new Date());
        }
        const validateUntilVal = document.getElementById("validateUntil");
        if (validateUntilVal) {
            validateUntilVal.value = view.postViewer.dateForm(new Date());
        }
    }

    fillFilter() {
        const filterConf = [];
        const author = document.getElementById("vendor-filter").value;
        if (author !== "all vendors") {
            filterConf.author = author;
        }
        const discount = document.getElementById("discount").value;
        if (discount) {
            filterConf.discount = discount;
        }
        const rating = document.getElementById("rating").value;
        if (rating) {
            filterConf.rating = rating;
        }
        const tags = document.getElementById("hashtags").value;
        if (tags) {
            filterConf.hashTags = tags.split(" ");
        }
        const createAt = document.getElementById("createdAt").value;
        const validateUntil = document.getElementById("validateUntil").value;
        let currentDate = view.postViewer.dateForm(new Date());
        let dates = [];
        if (createAt !== currentDate || validateUntil !== currentDate) {
            dates.createAt = new Date(createAt);
            dates.validateUntil = new Date(validateUntil);
        }
        filterConf.createdAt = dates.createAt;
        filterConf.validateUntill = dates.validateUntil;
        return filterConf;
    }

    createRequestParam(firstPostNumber, postNumber, filter) {
        let filterData = Object.assign({}, filter);
        filterData.skip = firstPostNumber;
        filterData.top = postNumber;
        let filterFields = Object.keys(filterData);
        let paramString = "";
        filterFields.forEach((param) => {
                paramString += "&" + param + "=" + filterData[param];
            }
        )
        return paramString.slice(1);
    }

    async makePage(firstPostNumber, postNumber, filter) {
        let paramString = feedEvents.createRequestParam(firstPostNumber, postNumber, filter);
        await feedEvents.getPosts(paramString, "/posts/search").then(response => {
            postServise.addAll(response);
            let posts = postServise.getPage(firstPostNumber, postNumber, filter);
            if (posts) {
                view.redrawPosts(posts);
            }
            feedEvents.initializeFilter();
            feedEvents.next.addEventListener("click", feedEvents._loadNextPosts);
            feedEvents.prev.addEventListener("click", feedEvents._loadPreviousPosts);
            feedEvents.setPostEvents(posts);
            if (view.isAuthorized()) {
                let logOutBtn = document.querySelector('.logout-button');
                logOutBtn.removeEventListener('click', modals.createSingInModal);
                logOutBtn.addEventListener('click', modals.createLogOutModal);
                addPostEvent.initializeAddPostButton();
            } else {
                let signInBtn = document.querySelector('.login-button');
                signInBtn.removeEventListener('click', modals.createLogOutModal);
                signInBtn.addEventListener('click', modals.createSingInModal);
            }
        }).catch(()=>{
            modals.createErrorModal("Error creating page");
        });
    }

    async getPosts(param, url) {
        return await fetch(url + "?" + param, {
            method: 'GET'
        }).then(response => response.json());
    }

    readInputFieldsLogIn() {
        const username = document.getElementsByClassName('username-input').item(0).value;
        if (!username) {
            feedEvents.showWarnings(".username-warning");
        }
        const password = document.getElementsByClassName('password').item(0).value;
        if (!password) {
            feedEvents.showWarnings(".password-warning");
        }
        if (password && username) {
            const user = usersCollection.getUser(username, password);
            if (user) {
                view.fillUser(user.username);
                modals._removeModal();
                feedEvents.makePage(0, 10).then();
            } else {
                feedEvents.showWarnings(".sign-in-warning");
            }
        }
    }

    showWarnings(warningType) {
        let warning = document.querySelector(warningType);
        if (warning) {
            warning.classList.add("show-warning");
        }
    }

    _loadNextPosts() {
            feedEvents.makePage(feedEvents.skippedPost + feedEvents.countPosts, feedEvents.countPosts + 10);
            feedEvents.skippedPost += 10;
            feedEvents.page.textContent++;
    }

    _loadPreviousPosts() {
        if (+feedEvents.page.textContent - 1 > 0) {
            feedEvents.makePage(feedEvents.skippedPost - feedEvents.countPosts, feedEvents.countPosts - 10);
            feedEvents.skippedPost -= 10;
            feedEvents.page.textContent--;
        }
    }

    setPostEvents(posts) {
        posts.forEach(post => {
            let postElem = document.getElementById(post.id);
            postEvent.setPostEventListener(postElem, post.id);
        })
    }
}

(() => {
    window.feedEvents = new FeedEvents();
    let users = [
        {
            username: 'Darroman',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            password: '1111'
        },
        {
            username: 'Kitty_love',
            photoLink: 'https://i.pinimg.com/564x/f4/d2/96/f4d2961b652880be432fb9580891ed62.jpg',
            password: '2222'
        },
        {
            username: 'Guitar Genius',
            photoLink: 'https://opt-1289634.ssl.1c-bitrix-cdn.ru/upload/iblock/790/7906fe4ed570929ca640580f05a7b4f6.jpg?1562573455190287',
            password: '3333'
        },
        {
            username: 'Evgeniya Solovyova',
            photoLink: null,
            password: '4444'
        },
        {
            username: 'Ivanov Alexander',
            photoLink: 'http://files.library.by/images/files/1476356097.jpg',
            password: '5555'
        },
        {
            username: 'Just furniture',
            photoLink: null,
            password: '6666'
        },
        {
            username: 'Novikov Alexey'
            ,
            photoLink: 'https://russianyellowpages.us/images/articles/29abuduschee.jpg',
            password: '7777'
        },
        {
            username: 'Lylalyuk Anna',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            password: '8888'
        },
        {
            username: 'Jonathan Trapp',
            photoLink: 'https://russianyellowpages.us/images/articles/avozdshari.jpg',
            password: '9999'
        },
        {
            username: 'Popova Ksenia',
            photoLink: 'https://russianyellowpages.us/images/articles/agorkatr.jpg',
            password: '1112'
        },
        {
            username: 'Sokolov Ivan',
            photoLink: 'https://russianyellowpages.us/images/articles/abudi.jpg',
            password: '1113'
        },
        {
            username: 'Mazhey Victor',
            photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
            password: '1122'
        },
        {
            username: 'Player',
            photoLink: 'https://opt-1289634.ssl.1c-bitrix-cdn.ru/upload/iblock/790/7906fe4ed570929ca640580f05a7b4f6.jpg?1562573455190287',
            password: '1234'
        }
    ];
    window.usersCollection.addAll(users);
    feedEvents.makePage(feedEvents.skippedPost, feedEvents.countPosts).then();
})();
