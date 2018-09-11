'use strict';

//PART ONE
let numbers = [];
let messages = ['Please, enter any number', 'Not a number was entered, please try again', 'Numbers was not entered'];
let input;
let sum = 0;

do {
	input = prompt(messages[0]);
	if (input === null) {
		break;
	} else if (!isNaN(input)) {
		numbers.push(Number(input));
    } else {
		alert(messages[1]);
    }
} while (input !== null);

for (const value of numbers) {
	sum += value;
}

if (numbers[0] === undefined) {
	alert(messages[2]);
} else {
	alert(`The total sum of numbers is ${sum}`);
}

//PART TWO
const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts = 3;

do {
    input = prompt('Enter your password: ');
    if (input === null) {
        alert('Canceled');
        break;
    } else if (passwords.indexOf(input) === -1) {
        attempts -= 1;
        if (attempts === 0) {
            alert('You have run out of attempts, your account has been locked');
            break;
        }
        alert(`Wrong pass. You have ${attempts} attempts`);
    } else {
        alert('Welcome, dude!');
        break;
    }
} while (true);