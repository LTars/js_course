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
