'use strict';

const show = document.querySelector('.show');

const inputId = document.querySelector('.input_id');
const inputName = document.querySelector('.input_name');
const inputAge = document.querySelector('.input_age');

const statusBar = document.querySelector('.status');

const url = 'https://test-users-api.herokuapp.com/users/';

const btn = document.querySelector('.wrap-b');

btn.addEventListener("click", handleBtnClick);

function handleBtnClick(event) {
    const target = event.target;

    if (target.nodeName !== "BUTTON") return;

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
        .then(data => addingAll(data))
        .catch(error => console.log(error));
}

function addUser(evt) {
    const post = {
        name: `${inputName.value}`,
        age: `${Number(inputAge.value)}`
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(data => addingNameAge(data))
        .catch(error => console.log(error));
    clearInput();
}

function getUser(evt) {
    fetch(`${url}${inputId.value}`)
        .then(response => response.json())
        .then(data => addingById(data))
        .catch(error => console.log(error));
    clearInput();
}

function editUser(evt) {
    let update = {};
    if (inputName.value === '' || inputAge.value === '') {
        return alert("Error");
    } else {
        update.name = inputName.value;
        update.age = inputAge.value;
    }
    console.log(update);
    fetch(`${url}${inputId.value}`, {
        method: 'PUT',
        body: JSON.stringify(update),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
        .then(data => addingUpdate(data))
        .catch(error => console.log(error));
    clearInput();
}

function deleteUser(evt) {
    fetch(`${url}${inputId.value}`, {
        method: 'DELETE'
    })
        .then(response => respStatus(response.status))
        .catch(error => console.log(error));
    clearInput();
    deleteAll()
}

function addingAll(data) {
    deleteAll();
    const HTMLString = data.data.reduce((acc, el) => acc += createTable(el), '');
show.insertAdjacentHTML('afterbegin', `${HTMLString}`);
}

function addingById(data) {
    deleteAll();
    const HTMLString = createTable(data.data);
show.insertAdjacentHTML('afterbegin', `${HTMLString}`);
}

function addingNameAge(data) {
    deleteAll();
    const HTMLString = createTable(data.data);
    show.insertAdjacentHTML('afterbegin', `${HTMLString}`);
}

function addingUpdate(data) {
    deleteAll();
    const HTMLString = createTable(data.data);
show.insertAdjacentHTML('afterbegin', `${HTMLString}`);
}


function createTable({id, name, age}) {
    return `<tr>
        <td class="id">${id}</td>
        <td class="name">${name}</td>
        <td class="age">${Number(age)}</td>
      </tr>`;
}

function respStatus(status) {
    statusBar.innerHTML = status === 200 ?
        `${inputId.value} user deleted` :
        'Something went wrong'
}

function deleteAll() {
    statusBar.innerHTML = '';
    show.innerHTML = '';
}

function clearInput() {
    const inputs = [inputId, inputName, inputAge];
    inputs.forEach(input => input.value = "");
}