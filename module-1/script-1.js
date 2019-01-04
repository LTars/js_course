'use strict';

//PART ONE
const adminLogin = 'Tars';
const adminPass = 'HardPass';

const msgCancel = 'Canceled..';
const msgWelcome = `Welcome, ${adminLogin}!`;
const msgDeny = 'Access denied!';

let userName = prompt('Enter your name: ');

if (userName === null) {
    alert(msgCancel);
} else if (userName === adminLogin) {
    let pass = prompt('Enter password: ');

    if (pass === null) {
        alert(msgCancel);
    } else if (pass === adminPass) {
        alert(msgWelcome);
    } else {
        alert(msgDeny);
    }
} else {
    alert(msgDeny);
}