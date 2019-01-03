'use strict';

//PART ONE
let numbers = [];
const msgEnterNumber = 'Please, enter any number';
const msgNaN = 'Not a number was entered, please try again';
const msgNoDataEntered = 'Numbers was not entered';
let input = '';
let sum = 0;

do {
	input = prompt(msgEnterNumber);
	if (input === null) {
        alert(msgNoDataEntered);
        break;
	} else if (!isNaN(input)) {
		numbers.push(Number(input));
    } else {
		alert(msgNaN);
    }
} while (input !== null);

if (numbers.length) {
    for (const value of numbers) {
        sum += value;
    }
    alert(`The total sum of numbers is ${sum}`);
}
