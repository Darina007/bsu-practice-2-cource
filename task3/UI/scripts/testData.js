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
likes: optional field
comments: optional field*/

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
        comments: [{
            commentAuthor: 'Kitty_love',
            commentDate: new Date('2021-03-18T23:00:00'),
            commentText: 'Cool!',
            commentMark: 5
        }]
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
        comments: [{
            commentAuthor: 'Иванов Иван',
            commentDate: new Date('2021-03-18T23:00:00'),
            commentText: 'I like it!',
            commentMark: 5
        },
            {
                commentAuthor: 'Соловьева Евгения',
                commentDate: new Date('2021-03-20T23:00:00'),
                commentText: 'I have two cats and i need more!!!',
                commentMark: 5
            }]
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
        comments: [{
            commentAuthor: 'Kitty_love',
            commentDate: new Date('2021-03-18T23:00:00'),
            commentText: 'Cool!',
            commentMark: 5
        }]
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
        comments: []
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
        comments: []
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
        comments: [{
            commentAuthor: 'Kitty_love',
            commentDate: new Date('2021-03-18T23:00:00'),
            commentText: 'Cool!',
            commentMark: 5
        }]
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
        comments: []
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
        comments: [{
            commentAuthor: 'Kitty_love',
            commentDate: new Date('2021-03-18T23:00:00'),
            commentText: 'Cool!',
            commentMark: 5
        }]
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
        comments: []
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
        comments: []
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
        comments: [{
            commentAuthor: 'Kitty_love',
            commentDate: new Date('2021-03-18T23:00:00'),
            commentText: 'Cool!',
            commentMark: 5
        }]
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
        comments: []
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
        comments: [{
            commentAuthor: 'Kitty_love',
            commentDate: new Date('2021-03-18T23:00:00'),
            commentText: 'Cool!',
            commentMark: 5
        }]
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
        comments: []
    },
    {
        id: '15',
        description: 'Основы игры на гитаре. Твои возможности.',
        createdAt: new Date('2021-03-21T23:00:00'),
        validateUntil: new Date('2021-04-04T23:00:00'),
        author: 'Player',
        photoLink: 'https://opt-1289634.ssl.1c-bitrix-cdn.ru/upload/iblock/790/7906fe4ed570929ca640580f05a7b4f6.jpg?1562573455190287',
        hashTags: ['guitar', 'learning_online'],
        discount: 42,
        rating: 3,
        likes: ['Иванов Александр'],
        comments: [{
            commentAuthor: 'Kitty_love',
            commentDate: new Date('2021-03-18T23:00:00'),
            commentText: 'Cool!',
            commentMark: 5
        }]
    },
    {
        id: '16',
        description: 'В центре Львова, в его исторической части расположен четырехзвездочный отель Швейцарский.',
        createdAt: new Date('2021-03-21T22:00:00'),
        validateUntil: new Date('2021-05-23T23:00:00'),
        author: 'Соловьева Евгения',
        photoLink: 'null',
        hashTags: ['tourist', 'love'],
        discount: 44,
        rating: 3,
        likes: ['Соколов Иван'],
        comments: []
    },
    {
        id: '17',
        description: 'Любые карты со временем приходят в плачевное состояние, но трудно понять игроков, которые, безмятежно проигрывая в преферанс значительные суммы, "экономят" на колоде.',
        createdAt: new Date('2020-10-13T23:00:00'),
        validateUntil: new Date('2021-10-23T23:00:00'),
        author: 'Иванов Александр',
        photoLink: 'https://files.library.by/images/files/1476356097.jpg',
        hashTags: ['game', 'cards'],
        discount: 31,
        rating: 3,
        likes: ['Попова Ксения'],
        comments: []
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
        comments: [{
            commentAuthor: 'Kitty_love',
            commentDate: new Date('2021-03-18T23:00:00'),
            commentText: 'Cool!',
            commentMark: 5
        }]
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
        comments: []
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
        comments: []
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
        comments: [{
            commentAuthor: 'Kitty_love',
            commentDate: new Date('2021-03-18T23:00:00'),
            commentText: 'Cool!',
            commentMark: 5
        }]
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
        comments: []
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
        comments: []
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
        comments: [{
            commentAuthor: 'Kitty_love',
            commentDate: new Date('2021-03-18T23:00:00'),
            commentText: 'Cool!',
            commentMark: 5
        }]
    },
];
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
        username: 'Гитарный гений',
        photoLink: 'https://opt-1289634.ssl.1c-bitrix-cdn.ru/upload/iblock/790/7906fe4ed570929ca640580f05a7b4f6.jpg?1562573455190287',
        password: '3333'
    },
    {
        username: 'Соловьева Евгения',
        photoLink: null,
        password: '4444'
    },
    {
        username: 'Иванов Александр',
        photoLink: 'http://files.library.by/images/files/1476356097.jpg',
        password: '5555'
    },
    {
        username: 'Просто мебель',
        photoLink: null,
        password: '6666'
    },
    {
        username: 'Новиков Алексей',
        photoLink: 'https://russianyellowpages.us/images/articles/29abuduschee.jpg',
        password: '7777'
    },
    {
        username: 'Lylalyuk Anna',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        password: '8888'
    },
    {
        username: 'Джонатан Трапп',
        photoLink: 'https://russianyellowpages.us/images/articles/avozdshari.jpg',
        password: '9999'
    },
    {
        username: 'Попова Ксения',
        photoLink: 'https://russianyellowpages.us/images/articles/agorkatr.jpg',
        password: '1112'
    },
    {
        username: 'Соколов Иван',
        photoLink: 'https://russianyellowpages.us/images/articles/abudi.jpg',
        password: '1113'
    },
    {
        username: 'Мажей Виктор',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        password: '1122'
    },
    {
        username: 'Player',
        photoLink: 'https://opt-1289634.ssl.1c-bitrix-cdn.ru/upload/iblock/790/7906fe4ed570929ca640580f05a7b4f6.jpg?1562573455190287',
        password: '1234'
    }
];
window.storage = window.localStorage;
if (!storage.length) {
    posts.forEach(post => {
        storage.setItem("post" + post.id, postsCollection.postToJSON(post));
    })
}
window.usersCollection.addAll(users);
feedEvents.makePage(feedEvents.skippedPost, feedEvents.countPosts);
