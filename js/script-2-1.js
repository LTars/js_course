'use strict';

//PART ONE
let numbers = [];
const msgEnterNumber = 'Please, enter any number';
const msgNaN = 'Not a number was entered, please try again';
const msgNoDataEntered = 'Numbers was not entered';
let input;
let sum = 0;

/*function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}*/

do {
	input = prompt(msgEnterNumber);
	if (input === null) {
        alert(msgNoDataEntered);
	} else if (!isNaN(parseFloat(input)) && isFinite(input)) { //isNumeric(input) ф-ции еще не проходили ^-^
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
