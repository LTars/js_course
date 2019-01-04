"use strict";

const laptops = [
    {
        size: 13,
        color: 'white',
        price: 28000,
        release_date: 2015,
        name: 'Macbook Air White 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 13,
        color: 'gray',
        price: 32000,
        release_date: 2016,
        name: 'Macbook Air Gray 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 13,
        color: 'black',
        price: 35000,
        release_date: 2017,
        name: 'Macbook Air Black 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'white',
        price: 45000,
        release_date: 2015,
        name: 'Macbook Air White 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'gray',
        price: 55000,
        release_date: 2016,
        name: 'Macbook Pro Gray 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'black',
        price: 45000,
        release_date: 2017,
        name: 'Macbook Pro Black 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'white',
        price: 65000,
        release_date: 2015,
        name: 'Macbook Air White 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'gray',
        price: 75000,
        release_date: 2016,
        name: 'Macbook Pro Gray 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'black',
        price: 80000,
        release_date: 2017,
        name: 'Macbook Pro Black 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
];

const list = document.querySelector('.content');
const source = document.querySelector('template').innerHTML.trim();
const form = document.querySelector('.js-form');
const sections = form.querySelectorAll('section');

form.addEventListener('click', formHandler);

function formHandler(evt) {
    const target = evt.target;
    if (target.id === 'filter') show(evt);
    if (target.id === 'clear') clearList();
}

function show(evt) {
    evt.preventDefault();
    const filter = {
        size: [],
        color: [],
        release_date: []
    };

    sections.forEach((item) => {
        const checked = Array.from(item.querySelectorAll('input[type="checkbox"]:checked'));
        if (!checked) {
            return;
        }

        checked.forEach((checkboxItem) => {
            filter[item.dataset.group].push(checkboxItem.value);
        });
    });

    buildList(filter);
}

function buildList({size, color, release_date}) {

    const filteredList = laptops.filter(laptops => {
        return (!size.length || size.includes(String(laptops.size)))
            && (!color.length || color.includes(laptops.color))
            && (!release_date.length || release_date.includes(String(laptops.release_date)))
    });

    domBuilder(filteredList);
}

function clearList() {
    list.innerHTML = '';
}

function addingMarkup(markUp) {
    clearList();
    list.insertAdjacentHTML('beforeend', markUp);
}

function domBuilder(listItems) {
    const template = Handlebars.compile(source);
    const markUp = listItems.reduce((acc, item) => acc += template(item), '');
    addingMarkup(markUp);
}