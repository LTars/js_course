'use strict';

//PART ONE
const adminLogin = 'Tars';
const adminPass = 'HardPass';

const msgCancel = 'Canceled..';
const msgWelcome = `Welcome, ${adminLogin}!`;
const msgDeny = 'Access denied!';

let userName = prompt('Name: ');

if (userName === null) {
    alert();
} else if (userName === adminLogin) {
    let pass = prompt('Password: ');

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