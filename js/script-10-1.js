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
            getAllUsers(target);
            break;
        case 'addUser':
            addUser(target);
            break;
        case 'getUser':
            getUser(target);
            break;
        case 'editUser':
            editUser(target);
            break;
        case 'deleteUser':
            deleteUser(target);
            break;
    }
}

function getAllUsers(evt) {
    fetch(url)
        .then(response => response.json())
        .then(data => processing(data))
        .catch(error => console.log(error));
}

function addUser(evt) {
    if (!isValidData()) return;

    const post = {
        name: `${form.elements["name"].value}`,
        age: `${form.elements["age"].value}`
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

function getUser(evt) {
    if (!form.elements["id"].value) return respStatus(msgNoData);

    fetch(`${url}${form.elements["id"].value}`)
        .then(response => response.json())
        .then(data => processing(data))
        .catch(error => {
            respStatus(msgErr);
            console.log(error);
        });
}

function editUser(evt) {
    if (!isValidData()) return;

    let update = {};
    update.name = form.elements["name"].value;
    update.age = form.elements["age"].value;
    console.log(update);
    fetch(`${url}${form.elements["id"].value}`, {
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
    getUser(evt);
    if (!form.elements["id"].value) return respStatus(msgNoData);
    setTimeout(() => {
        if (statusBar.innerText === msgErr) return;
        fetch(`${url}${form.elements["id"].value}`, {
            method: 'DELETE'
        })
            .then(response => respStatus(response.status))
            .catch(error => console.log(error));
    }, 0)
}

function processing(data) {
    let HTMLString;
    if (data.data.name) {
        HTMLString = createTable(data.data);
    } else {
        HTMLString = data.data.reduce((acc, el) => acc += createTable(el), '');
    }
    show.insertAdjacentHTML('afterbegin', `${HTMLString}`);
    form.reset();
}

function createTable({id, name, age, _id}) {
    if (id) {
        return `<tr>
        <td class="id">${id}</td>
        <td class="name">${name}</td>
        <td class="age">${age}</td>
      </tr>`;
    }
    return `<tr>
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
    if (!form["name"].value || !form["age"].value) {
        respStatus(msgNoData);
        return false;
    }
    if (!isNumeric(form["age"].value)) {
        respStatus(msgNaN);
        return false;
    }
    return true;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && Number.isInteger(Number(n));
}