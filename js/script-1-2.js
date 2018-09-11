'use strict';

//PART TWO
const hurgada = 25;
const sharm = 15;
const taba = 6;

const msgHowMany = 'How many tickets you want?';
const msgErr = 'Input Error!';
const msgAccept = 'Have a good trip!';
const msgDeny = 'Maybe next time..';
const msgSorry = 'Sorry, there are not so many tickets in any group';

let demand = prompt(msgHowMany);

if (parseInt(demand)) {
    alert(msgErr);
} else {
    let choice;
    demand = Number.parseInt(demand);

    if (demand <= hurgada) {
        choice = confirm(`You can buy ${demand} tickets in Hurgada's group. Will you?`);

        if (choice) {
            alert(msgAccept);
            hurgada = hurgada - demand;
        } else {
            alert(msgDeny);
        }

    } else if (demand <= sharm) {
        choice = confirm(`You can buy ${demand} tickets in Sharm's group. Will you?`);

        if (choice) {
            alert(msgAccept);
            sharm = sharm - demand;
        } else {
            alert(msgDeny);
        }
    } else if (demand <= taba) {
        choice = confirm(`You can buy ${demand} tickets in Taba's group. Will you?`);
        if (choice) {
            alert(msgAccept);
            taba = taba - demand;
        } else {
            alert(msgDeny);
        }
    } else {
        alert(msgSorry);
    }
}