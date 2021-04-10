//--------Info about post-------------
/* id: required field
description: required field (length < 200)
createdAt: required field
validateUntil: required field
author: required field
photoLink: optional field
hashTags: optional field
discount: required field (in percent)
rating: optional field (from 1 to 5)
likes: optional field  */


let posts = [
    {
        id: '1',
        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом. Новая вакцина специально для вас!',
        createdAt: new Date('2021-03-17T23:00:00'),
        validateUntil: new Date('2021-03-27T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['krone', 'virus', 'vaccine'],
        discount: 12,
        rating: 2,
        likes: ['Kitty_love', 'Гитарный гений', 'Соловьева Евгения'],
    },
    {
        id: '2',
        description: 'Котик всегда поднимет настроение! Возьмите котика в свой дом.',
        createdAt: new Date('2021-03-12T23:00:00'),
        validateUntil: new Date('2021-03-22T23:00:00'),
        author: 'Kitty_love',
        photoLink: 'https://i.pinimg.com/564x/f4/d2/96/f4d2961b652880be432fb9580891ed62.jpg',
        hashTags: ['kat', 'love'],
        discount: 100,
        rating: 5,
        likes: ['Иванов Иван'],
    },
    {
        id: '3',
        description: 'Нет ничего невозможного. Если ты хочешь что-то сделать - ты этот сделаешь. Основы игры на гитаре.',
        createdAt: new Date('2021-02-17T23:00:00'),
        validateUntil: new Date('2021-02-27T23:00:00'),
        author: 'Гитарный гений',
        photoLink: 'https://opt-1289634.ssl.1c-bitrix-cdn.ru/upload/iblock/790/7906fe4ed570929ca640580f05a7b4f6.jpg?1562573455190287',
        hashTags: ['guitar', 'learning_online'],
        discount: 25,
        rating: 3,
        likes: ['Иванов Иван', 'Соловьева Евгения'],
    },
    {
        id: '4',
        description: 'В центре Львова, в его исторической части расположен четырехзвездочный отель Швейцарский.',
        createdAt: new Date('2021-03-21T22:00:00'),
        validateUntil: new Date('2021-03-31T23:00:00'),
        author: 'Соловьева Евгения',
        photoLink: null,
        hashTags: ['tourist', 'love'],
        discount: 30,
        rating: 2,
        likes: ['Иванов Иван'],
    },
    {
        id: '5',
        description: 'Любые карты со временем приходят в плачевное состояние, но трудно понять игроков, которые, безмятежно проигрывая в преферанс значительные суммы, "экономят" на колоде.',
        createdAt: new Date('2020-10-13T23:00:00'),
        validateUntil: new Date('2020-10-23T23:00:00'),
        author: 'Иванов Александр',
        photoLink: 'http://files.library.by/images/files/1476356097.jpg',
        hashTags: ['game', 'cards'],
        discount: 12,
        rating: 4,
        likes: ['Иванов Иван', 'Соловьева Евгения', 'Соколов Иван', 'Lylalyuk Anna'],
    },
    {
        id: '6',
        description: 'На специализированной мебельной выставке фирма Простор-Мебель представляет принципиально новую для Латвии систему мебели под интригующим названием. Фирма Простор-Мебель - российское предприятие.',
        createdAt: new Date('2020-03-17T11:23:00'),
        validateUntil: new Date('2020-03-27T23:00:00'),
        author: 'Просто мебель',
        photoLink: null,
        hashTags: ['furniture', 'sleep'],
        discount: 52,
        rating: 1,
        likes: ['Соколов Иван', 'Lylalyuk Anna'],
    },
    {
        id: '7',
        description: 'У ноутбука Plantbook гибкий дисплей, сенсорная клавиатура, и… он сворачивается в трубочку! Также для его зарядки можно не просто использовать обыкновенную солнечную энергию, но и воду!',
        createdAt: new Date('2020-03-17T20:53:00'),
        validateUntil: new Date('2020-03-27T23:00:00'),
        author: 'Новиков Алексей',
        photoLink: 'https://russianyellowpages.us/images/articles/29abuduschee.jpg',
        hashTags: ['technology', 'science'],
        discount: 80,
        rating: 5,
        likes: ['Соловьева Евгения', 'Lylalyuk Anna'],
    },
    {
        id: '8',
        description: 'Core Glow это необыкновенно красивые светящиеся камни, которые часто сравнивают с Млечным путем. Сейчас это один из самых популярных способов оформления земельного участка.',
        createdAt: new Date('2020-03-17T23:00:00'),
        validateUntil: new Date('2020-03-27T23:00:00'),
        author: 'Lylalyuk Anna',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['garden', 'beauty'],
        discount: 60,
        rating: 3,
        likes: ['Соколов Иван'],
    },
    {
        id: '9',
        description: 'Самое сложное с утра это встать.  С летающим будильником не встать не получится.',
        createdAt: new Date('2021-03-17T23:55:00'),
        validateUntil: new Date('2021-03-27T23:00:00'),
        author: 'Lylalyuk Anna',
        photoLink: 'https://podaro4ek.by/images/stories/virtuemart/product/gadget_11.jpg',
        hashTags: ['technology', 'morning'],
        discount: 95,
        rating: 4,
        likes: ['Иванов Александр', 'Попова Ксения'],
    },
    {
        id: '10',
        description: 'Через атлантику на воздушных шарах.',
        createdAt: new Date('2021-01-01T23:00:00'),
        validateUntil: new Date('2021-03-11T23:00:00'),
        author: 'Джонатан Трапп',
        photoLink: 'https://russianyellowpages.us/images/articles/avozdshari.jpg',
        hashTags: ['tourist', 'travel'],
        discount: 10,
        rating: 2,
        likes: ['Джонатан Трапп', 'Соколов Иван', 'Соколов Иван'],
    },
    {
        id: '11',
        description: 'Совсем недавно в стране восходящего солнца построили поистине уникальный аттракцион под названием Takabisha. Отличается этот аттракцион тем, что лишь на нем вы прокатитесь под углом в 121 градус!',
        createdAt: new Date('2021-03-22T09:25:00'),
        validateUntil: new Date('2021-04-01T23:00:00'),
        author: 'Попова Ксения',
        photoLink: 'https://russianyellowpages.us/images/articles/agorkatr.jpg',
        hashTags: ['roller_coaster'],
        discount: 22,
        rating: 5,
        likes: ['Иванов Александр'],
    },
    {
        id: '12',
        description: 'Изобретатель Гаури Нанда, из Массачусетского технологического института, изобрел очень интересный будильник. Он будет убегать от вас, прятаться под кровать, пока вы полностью не встанете с кровати.',
        createdAt: new Date('2020-12-29T07:12:00'),
        validateUntil: new Date('2021-01-19T23:00:00'),
        author: 'Соколов Иван',
        photoLink: 'https://russianyellowpages.us/images/articles/abudi.jpg',
        hashTags: ['clock', 'technology', 'alarm_clock'],
        discount: 5,
        rating: 2,
        likes: ['Соколов Иван', 'Джонатан Трапп'],
    },
    {
        id: '13',
        description: 'Ученным удалось обнаружить самый огромный вирус, который когда-либо встречался человечеству. Ему дали название Пандоравирус, и он в 9 раз больше всех существующих вирусов, которые известны ученым.',
        createdAt: new Date('2021-01-12T11:00:00'),
        validateUntil: new Date('2021-01-22T23:00:00'),
        author: 'Мажей Виктор',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['virus'],
        discount: 12,
        rating: 2,
        likes: ['Соловьева Евгения', 'Иванов Александр'],
    },
    {
        id: '14',
        description: 'Котик всегда поднимет настроение!',
        createdAt: new Date('2020-08-12T12:36:00'),
        validateUntil: new Date('2021-08-22T23:00:00'),
        author: 'Kitty_love',
        photoLink: 'https://i.pinimg.com/564x/f4/d2/96/f4d2961b652880be432fb9580891ed62.jpg',
        hashTags: ['kitty', 'love'],
        discount: 32,
        rating: 3,
        likes: ['Соколов Иван'],
    },
    {
        id: '15',
        description: 'Основы игры на гитаре. Твои возможности.',
        createdAt: new Date('2021-03-21T23:00:00'),
        validateUntil: new Date('2021-04-04T23:00:00'),
        author: 'Player',
        photoLink: 'https://opt-1289634.ssl.1c-bitrix-cdn.ru/upload/iblock/790/7906fe4ed570929ca640580f05a7b4f6.jpg?1562573455190287',
        hashTags: ['guitar', 'learning_online'],
        likes: ['Иванов Александр'],
    },
    {
        id: '16',
        description: 'В центре Львова, в его исторической части расположен четырехзвездочный отель Швейцарский.',
        createdAt: new Date('2021-03-21T22:00:00'),
        validateUntil: new Date('2021-5-23T23:00:00'),
        author: 'Соловьева Евгения',
        photoLink: null,
        hashTags: ['tourist', 'love'],
        discount: 44,
        rating: 3,
        likes: ['Соколов Иван'],
    },
    {
        id: '17',
        description: 'Любые карты со временем приходят в плачевное состояние, но трудно понять игроков, которые, безмятежно проигрывая в преферанс значительные суммы, "экономят" на колоде.',
        createdAt: new Date('2020-10-13T23:00:00'),
        validateUntil: new Date('2021-10-23T23:00:00'),
        author: 'Иванов Александр',
        photoLink: 'http://files.library.by/images/files/1476356097.jpg',
        hashTags: ['game', 'cards'],
        discount: 31,
        rating: 3,
        likes: ['Попова Ксения'],
    },
    {
        id: '18',
        description: 'Фирма Простор-Мебель представляет принципиально новую для Латвии систему мебели. Фирма Простор-Мебель - российское предприятие.',
        createdAt: new Date('2020-12-17T11:23:00'),
        validateUntil: new Date('2021-01-27T23:00:00'),
        author: 'Просто мебель',
        photoLink: null,
        hashTags: ['furniture', 'sleep'],
        discount: 72,
        rating: 3,
        likes: ['Соколов Иван', 'Соловьева Евгения', 'Попова Ксения'],
    },
    {
        id: '19',
        description: 'У ноутбука Plantbook гибкий дисплей, сенсорная клавиатура, и… он сворачивается в трубочку! Также для его зарядки можно не просто использовать обыкновенную солнечную энергию, но и воду!',
        createdAt: new Date('2020-11-17T20:53:00'),
        validateUntil: new Date('2021-05-01T23:00:00'),
        author: 'Новиков Алексей',
        photoLink: 'https://russianyellowpages.us/images/articles/29abuduschee.jpg',
        hashTags: ['technology', 'science'],
        discount: 10,
        rating: 3,
        likes: ['Соловьева Евгения', 'Попова Ксения'],
    },
    {
        id: '20',
        description: 'Core Glow это необыкновенно красивые светящиеся камни, которые часто сравнивают с Млечным путем. Сейчас это один из самых популярных способов оформления земельного участка.',
        createdAt: new Date('2020-03-17T23:00:00'),
        validateUntil: new Date('2021-04-27T23:00:00'),
        author: 'Lylalyuk Anna',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: ['garden', 'beauty'],
        discount: 22,
        rating: 2,
        likes: ['Соколов Иван'],
    },
    {
        id: '21',
        description: 'Самое сложное с утра это встать.  С летающим будильником не встать не получится.',
        createdAt: new Date('2021-03-17T23:55:00'),
        validateUntil: new Date('2021-04-07T23:00:00'),
        author: 'Lylalyuk Anna',
        photoLink: 'https://podaro4ek.by/images/stories/virtuemart/product/gadget_11.jpg',
        hashTags: ['technology', 'morning'],
        discount: 25,
        rating: 2,
        likes: ['Попова Ксения'],
    },
    {
        id: '22',
        description: 'Через атлантику на воздушных шарах.',
        createdAt: new Date('2021-01-01T23:00:00'),
        validateUntil: new Date('2021-04-01T23:00:00'),
        author: 'Джонатан Трапп',
        photoLink: 'https://russianyellowpages.us/images/articles/avozdshari.jpg',
        hashTags: ['tourist', 'travel'],
        discount: 12,
        rating: 4,
        likes: ['Соколов Иван'],
    },
    {
        id: '23',
        description: 'Совсем недавно в стране восходящего солнца построили поистине уникальный аттракцион под названием Takabisha. Отличается этот аттракцион тем, что лишь на нем вы прокатитесь под углом в 121 градус!',
        createdAt: new Date('2021-03-22T09:25:00'),
        validateUntil: new Date('2021-03-27T23:00:00'),
        author: 'Попова Ксения',
        photoLink: 'https://russianyellowpages.us/images/articles/agorkatr.jpg',
        hashTags: ['roller_coaster'],
        discount: 2,
        rating: 2,
        likes: ['user1'],
    },
    {
        id: '24',
        description: 'Изобретатель Гаури Нанда, из Массачусетского технологического института, изобрел очень интересный будильник. Он будет убегать от вас, прятаться под кровать, пока вы полностью не встанете с кровати.',
        createdAt: new Date('2020-12-29T07:12:00'),
        validateUntil: new Date('2021-05-27T23:00:00'),
        author: 'Соколов Иван',
        photoLink: 'https://russianyellowpages.us/images/articles/abudi.jpg',
        hashTags: ['clock', 'technology', 'alarm_clock'],
        discount: 50,
        rating: 5,
        likes: ['Соловьева Евгения', 'Попова Ксения'],
    },
];


//------functions--------

;(function () {
    function getPosts(skip, top, filterConfig) {
        let countSkippedPosts = skip || 0;
        let countReceivedPosts = top || 10;
        let workingArray = posts.slice();
        if (typeof filterConfig !== 'undefined') {
            if (typeof filterConfig.author != 'undefined') {
                workingArray = workingArray.filter(function (value) {
                    return value.author === filterConfig.author;
                })
            }
            if (typeof filterConfig.createdAt != 'undefined') {
                workingArray = workingArray.filter(function (value) {
                    return value.createdAt.getDate() === filterConfig.createdAt.getDate()
                        && value.createdAt.getMonth() === filterConfig.createdAt.getMonth()
                        && value.createdAt.getFullYear() === filterConfig.createdAt.getFullYear();
                })
            }
            if (typeof filterConfig.tags != 'undefined') {
                workingArray = workingArray.filter(function (value) {
                    let flag = false;
                    value.hashTags.forEach(val => {
                        if (filterConfig.tags.includes(val)) {
                            flag = true;
                        }
                    });
                    return flag;
                })
            }
            if (typeof filterConfig.validateUntil != 'undefined') {
                workingArray = workingArray.filter(function (value) {
                    let flag = false;
                    if (value.validateUntil-filterConfig.validateUntil >= 0) {
                        flag = true;
                    }
                    return flag;
                })
            }
            if (typeof filterConfig.discount != 'undefined') {
                workingArray = workingArray.filter(function (value) {
                    let flag = false;
                    if (value.discount-filterConfig.discount >= 0) {
                        flag = true;
                    }
                    return flag;
                })
            }
            if (typeof filterConfig.rating != 'undefined') {
                workingArray = workingArray.filter(function (value) {
                    let flag = false;
                    if (value.rating-filterConfig.rating >= 0) {
                        flag = true;
                    }
                    return flag;
                })
            }
        }

        workingArray.sort(function (firstPost, secondPost) {
            return secondPost.createdAt - firstPost.createdAt;
        });
        workingArray = workingArray.slice(countSkippedPosts, countSkippedPosts + countReceivedPosts);
        return workingArray;
    }

    function getPost(id) {
        return posts.find(item => item.id === id);
    }

    function validatePost(post) {
        let flag = false;
        if (typeof post.id != 'undefined' && typeof post.description != 'undefined'
            && typeof post.author != 'undefined' && typeof post.createdAt != 'undefined'
            && (post.validateUntil - post.createdAt) > 0
            && post.discount > 0 && post.discount <= 100) {
            if (post.author.length !== 0 && post.description.length < 200) {
                let unique = posts.findIndex(item => item.id === post.id);
                if (unique === -1) {
                    flag = true;
                }
            }
        }
        return flag;
    }

    function addPost(post) {
        if (validatePost(post)) {
            posts.push(post);
            return true;
        }
        return false;
    }

    function editPost(id, edit) {
        let unchanged = getPost(id);
        let original = {...unchanged};
        original.description = edit.description || original.description;
        original.photoLink = edit.photoLink || original.photoLink;
        original.hashTags = edit.tags || original.hashTags;
        removePost(id);
        if (validatePost(original)) {
            addPost(original);
            return true;
        } else {
            addPost(unchanged);
            return false;
        }
    }

    function removePost(id) {
        return posts.splice(posts.findIndex(item => item.id === id), 1);
    }


    //------tests---------
    console.log(getPosts(0, 10));
    console.log(getPosts(10, 10));
    console.log(getPosts(0, 10, {author: "Иванов Иван"}));
    console.log(getPosts(0, 10, {tags: ['love']}));
    console.log(getPosts(0, 10, {createdAt: new Date('2020-03-17T23:00:00')}));
    console.log(getPost(3));
    console.log(getPosts(0, 10, {validateUntil: new Date('2020-03-17T23:00:00')}));
    console.log(getPosts(0, 10, {validateUntil: new Date()}));
    console.log(getPosts(0, 10, {discount: 50}));
    console.log(getPosts(0, 10, {rating: 5}));

    console.log(addPost({
        id: 25,
        createdAt: new Date('2021-03-22T23:00:18'),
        author: 'Иванов Иван',
        description: 'Корпусная мебель с МИНИМАЛЬНОЙ выгодой.',
        tags: ['discount', 'sale'],
        discount: 12,
        validateUntil: new Date('2021-03-27T23:00:00'),
        rating: null,
        likes: [],
    }));
    console.log(addPost({
        id: 26,
        createdAt: new Date('2021-03-22T23:00:18'),
        author: 'Иванов Иван',
        description: 'Корпусная мебель с МИНИМАЛЬНОЙ выгодой.',
        tags: ['discount', 'sale'],
        discount: 122,
        validateUntil: new Date('2021-03-27T23:00:00'),
        rating: null,
        likes: [],
    }));
    console.log(getPost(25));
    console.log(editPost(25, {description: 'Корпусная мебель с МАКСИМАЛЬНОЙ выгодой',}));
    console.log(getPost(25));
    console.log(removePost(25));
    console.log(getPosts(20, 10));
}());