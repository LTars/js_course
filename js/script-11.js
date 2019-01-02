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

form.addEventListener('click', formHandler);

function formHandler(evt) {
    const target = evt.target;
    if (target.textContent === 'Filter') show(evt);
    if (target.textContent === 'Clear') clearList();
}

function show(evt) {
    evt.preventDefault();
    const checkBoxes = document.querySelectorAll('input');
    const checkBoxesChecked = Array.from(checkBoxes).filter(box => box.checked);
    filterCards(checkBoxesChecked);
}

function filterCards (inputs) {
    const filter = {
        size: inputs.filter(e => e.name === 'size').map(e => e.value),
        color: inputs.filter(e => e.name === 'color').map(e => e.value),
        release_date : inputs.filter(e => e.name === 'release_date').map(e => e.value),
    };

    for (const prop in filter) {
        if (filter[prop].length === 0) {
            filter[prop] = laptops.reduce((acc, obj) => acc.includes(String(obj[prop])) ?
                acc :
                acc.concat(String(obj[prop])), []);
        }
    }
    buildList(filter);
}

function buildList (obj) {

    const filteredList = laptops.filter(laptops => obj.size.includes(String(laptops.size))&&obj.color.includes(laptops.color)&&obj.release_date.includes(String(laptops.release_date)));
    domBuilder(filteredList);
}

function clearList() {
    list.innerHTML = '';
}

function domBuilder(listItems) {
    const template = Handlebars.compile(source);
    const markUp = listItems.reduce((acc, item) => acc += template(item),'');
    addingMarkup(markUp);
}

function addingMarkup(markUp) {
    clearList();
    list.insertAdjacentHTML('beforeend', markUp);
}

domBuilder(laptops);