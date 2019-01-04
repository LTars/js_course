'use strict';

//PART TWO
const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
const msgEnterPass = 'Enter your password: ';
const msgCanceled = 'Canceled';
const msgAccBlocked = 'You have run out of attempts, your account has been locked';
const msgWelcome = 'Welcome, dude!';
let attempts = 3;
let input;

do {
    input = prompt(msgEnterPass);
    if (input === null) {
        alert(msgCanceled);
        break;
    }
    if (passwords.includes(input)) { //(passwords.indexOf(input) !== -1)
        alert(msgWelcome);
        break;
    } else {
        attempts -= 1;
        alert(`Wrong pass. You have ${attempts} attempts`);
    }
    if (attempts === 0) {
        alert(msgAccBlocked);
        break;
    }
} while (true);