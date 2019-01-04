'use strict';

const show = document.querySelector('.show');

const form = document.querySelector('.form-js');

const statusBar = document.querySelector('.status');

const btn = document.querySelector('.wrap-b');

const url = "https://test-users-api.herokuapp.com/users/";
const msgErr = "Something went wrong..";
const msgNoData = "Please, enter relevant info";
const msgNaN = "Please, enter round numeric value for age";
const msgDeleted = "User Deleted";

btn.addEventListener("click", handleBtnClick);

function handleBtnClick(event) {
    const target = event.target;

    if (target.nodeName !== "BUTTON") return;
    deleteAll();

    switch (target.id) {
        case 'getAllUsers':
            getAllUsers();
            break;
        case 'addUser':
            addUser();
            break;
        case 'getUser':
            getUser();
            break;
        case 'editUser':
            editUser();
            break;
        case 'deleteUser':
            deleteUser(target);
            break;
    }
}

function getAllUsers() {
    fetch(url)
        .then(response => response.json())
        .then(data => processing(data))
        .catch(error => console.log(error));
}

function addUser() {
    if (!isValidData()) return;
    const {age, name} = form.elements;

    const post = {
        name: `${name.value}`,
        age: `${age.value}`
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(data => processing(data))
        .catch(error => console.log(error));
}

function getUser() {
    const {id} = form.elements;
    if (!id.value) return respStatus(msgNoData);

    fetch(`${url}${id.value}`)
        .then(response => response.json())
        .then(data => processing(data))
        .catch(error => {
            respStatus(msgErr);
            console.log(error);
        });
}

function editUser() {
    if (!isValidData()) return;
    const {id, name, age} = form.elements;

    let update = {};
    update.name = name.value;
    update.age = age.value;
    fetch(`${url}${id.value}`, {
        method: 'PUT',
        body: JSON.stringify(update),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
        .then(data => processing(data))
        .catch(error => console.log(error));
}

function deleteUser(evt) {
    const {id} = form.elements;
    getUser(evt);
    if (!id.value) return respStatus(msgNoData);
    setTimeout(() => {
        if (statusBar.innerText === msgErr) return;
        fetch(`${url}${id.value}`, {
            method: 'DELETE'
        })
            .then(response => respStatus(response.status))
            .catch(error => console.log(error));
    }, 0)
}

function processing({data}) {
    let HTMLString;
    if (data.name) {
        HTMLString = createTable(data);
    } else {
        HTMLString = data.reduce((acc, el) => acc += createTable(el), '');
    }
    show.insertAdjacentHTML('afterbegin', `${HTMLString}`);
    form.reset();
}

function createTable({id, name, age, _id}) {
        return id ? `<tr>
        <td class="id">${id}</td>
        <td class="name">${name}</td>
        <td class="age">${age}</td>
      </tr>`:
     `<tr>
        <td class="id">${_id}</td>
        <td class="name">${name}</td>
        <td class="age">${age}</td>
      </tr>`;
}

function respStatus(status) {
    switch (status) {
        case 200:
            status = msgDeleted;
            break;
        case msgNaN:
            status = msgNaN;
            break;
        case msgNoData:
            status = msgNoData;
            break;
        default:
            status = msgErr;
            break;
    }
    statusBar.innerHTML = status;
}

function deleteAll() {
    statusBar.innerHTML = '';
    show.innerHTML = '';
}

function isValidData() {
    const {name, age} = form.elements;

    if (!name.value || !age.value) {
        respStatus(msgNoData);
        return false;
    }
    if (!isNumeric(age.value)) {
        respStatus(msgNaN);
        return false;
    }
    return true;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && Number.isInteger(Number(n));
}