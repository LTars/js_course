'use strict';

//PART TWO
const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
const messages = ['Enter your password: ',
    'Canceled',
    'You have run out of attempts, your account has been locked',
    'Welcome, dude!'];
let attempts = 3;

do {
    input = prompt(messages[0]);
    if (input === null) {
        alert(messages[1]);
        break;
    } else if (passwords.indexOf(input) === -1) {
        attempts -= 1;
        if (attempts === 0) {
            alert(messages[2]);
            break;
        }
        alert(`Wrong pass. You have ${attempts} attempts`);
    } else {
        alert(messages[3]);
        break;
    }
} while (true);