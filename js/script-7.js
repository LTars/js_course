"use strict"
   const Card =
    {
        image: {"src": "https://placeimg.com/400/150/arch", "alt":"movie image"},
        title: "Post title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus" +
        " voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
        date: "Released: 1972-03-14",
        rating: "Rating: ",
    };

function setAttributes(e, attr) {
    attr.forEach(function (a) {
        for (var name in a) {
            e.setAttribute(name, a[name]);
        }
    }, e);
}

function setClasses(e, classes) {
    classes.forEach(function (a) {
        e.classList.add(a);
    }, e);
}

function addElem(tag, classes = [], attr = [], content = '') {
    let e = document.createElement(tag);
    setClasses(e, classes);
    setAttributes(e, attr);
    e.textContent = content;
    return e;
}

const createMovieCard = (Card, i) => {

    let node = addElem('div', ['movie']);
    let img = addElem('img', ['movie__image'],
        [
            {"src": Card.image.src},
            {"alt": Card.image.alt},
        ]
    );
    node.append(img);

    let body = addElem('div', ['movie__body']);

    let title = addElem('h2', ['movie__title'],
        [],  Card.title + " " + i);

    let descr = addElem('p', ['movie__description'],
        [], Card.description
    );

    let mdate = addElem('p', ['movie__date'], [], Card.date
    );

    let rating = addElem('p', ['movie__rating'],
        [], Card.rating + Math.round(Math.random()*100)/10
    );
    body.append(title, descr, mdate, rating);
    node.append(body);
    return node;
};
let arrCards = [];
const createCards = (cnt) => {
    for (var i = 1; i <= cnt; i++) {
        arrCards.push(createMovieCard(Card, i));
    }

    return arrCards;
};

let cnt = prompt("Сколько карточек создать?");
createCards(cnt);
document.body.append(...arrCards);
