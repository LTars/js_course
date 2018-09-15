'use strict';
let numbers = [1, 2, 3, 5, 7, 9, 12, 15, 24];
const check = function (sum, arr = numbers) { // есть ли в массиве пара чисел, сумма которых = 'sum'?
    let msg = 'No such pair of numbers fained';

    for (let i = arr.length - 1; i !== 0; i--) {
        if (sum > arr[i]) {
            for (let j = 0; j < i; j++) {
                if (arr[i] + arr[j] > sum) {
                    break;
                } else if (arr[i] + arr[j] === sum) {
                    msg = `Bingo! ${arr[i]} + ${arr[j]} = ${arr[i] + arr[j]}!`;
                    return msg;
                }
            }
        }
    }
    return msg;
};

check(10);