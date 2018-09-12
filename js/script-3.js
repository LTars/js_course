'use strict';
const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];

const isLoginValid = function(login) {
    return login.length >=4 && login.length <= 16;
};

const isLoginUnique = function(login, allLogins = logins) {
    return !allLogins.includes(login);
};

const addLogin = function(login, allLogins = logins) {
    if (isLoginValid(login)) {
        if (isLoginUnique(login)) {
            allLogins.push(login);
            return "Login successfully added!";
        } else {
            return "This login is already in use";
        }
    } else {
        return "Error! Login must be between 4 and 16 characters";
    }
};

// Вызовы функции для проверки
addLogin('Ajax'); // 'Логин успешно добавлен!'
addLogin('robotGoogles'); // 'Такой логин уже используется!'
addLogin('Zod'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
addLogin('jqueryisextremelyfast'); // 'Ошибка! Логин должен быть от 4 до 16 символов'