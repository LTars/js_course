"use strict";
function setAttributes(e, attr) {
    attr.forEach(function (a, i) {
        for (var name in a) {
            e.setAttribute(name, a[name]);
        }
    }, e);
}

function setClasses(e, classes) {
    classes.forEach(function (a, i) {
            e.classList.add(a);
            //console.log(a[name]);
    }, e);
}

function addElem(tag, classes = [], attr = [], content = '') {
    let e = document.createElement(tag);
    setClasses(e, classes);
    setAttributes(e, attr);
    e.textContent = content;
    return e;
}

const createMovieCard = () => {

    let node = addElem('div', ['movie']);

    let img = addElem('img', ['movie__image'],
        [
            {"src": "http://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg"},
            {"alt": "movie image"},
        ]
    );
    node.append(img);

    let body = addElem('div', ['movie__body']);

    let title = addElem('h2', ['movie__title'],
        [], "The Godfather");

    let descr = addElem('p', ['movie__description'],
        [], "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the\n" +
        "            would-be killers, launching a campaign of bloody revenge."
    );

    let mdate = addElem('p', ['movie__date'], [], "Released: 1972-03-14"
    );

    let rating = addElem('p', ['movie__rating'],
        [], "Rating: 8.6"
    );
    body.append(title, descr,mdate,rating);
    node.append(body);
    document.body.append(node);

};
createMovieCard();
