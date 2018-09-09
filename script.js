//PART ONE
const adminLogin = 'Tars';
const adminPass = 'HardPass';

let userName = prompt('Name: ');

if (userName === null) {
    alert('Canceled..');
} else if (userName === adminLogin) {
    let pass = prompt('Password: ');
    if (pass === null) {
        alert('Canceled..');
    } else if (pass === adminPass) {
        alert(`Welcome, ${adminLogin}!`);
    } else {
        alert('Access denied!');
    }
} else {
    alert('Access denied!');
}

//PART TWO

let sharm = 15;
let hurgada = 25;
let taba = 6;

let demand = prompt('How many tickets you want?');

if (demand != Number.parseInt(demand) || Number.parseInt(demand) < 1) {
    alert('Input Error!');
} else {
    let choice;
    demand = Number.parseInt(demand);
    if (demand <= sharm) {
        choice = confirm(`You can buy ${demand} tickets in Sharm's group. Will you?`);
        if (choice) {
            alert('Have a good trip!');
            sharm = sharm - demand;
        } else {
            alert('Maybe next time..');
        }
    }
    if (demand <= hurgada) {
        choice = confirm(`You can buy ${demand} tickets in Hurgada's group. Will you?`);
        if (choice) {
            alert('Have a good trip!');
            hurgada = hurgada - demand;
        } else {
            alert('Maybe next time..');
        }

    }
    if (demand <= taba) {
        choice = confirm(`You can buy ${demand} tickets in Taba's group. Will you?`);
        if (choice) {
            alert('Have a good trip!');
            taba = taba - demand;
        } else {
            alert('Maybe next time..');
        }
    }
    if (demand > taba && demand > hurgada && demand > sharm) {
        alert("Sorry, there are not so many tickets in any group");
    }
}

console.log(`${demand}; sharm = ${sharm}; hurgada = ${hurgada}; taba = ${taba}`)