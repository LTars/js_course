class Stopwatch {
    constructor(parent = document.body) {
        this.id = cnt;
        this.parent = parent;
        this.name = `#${cnt}`;
        this.box = '';
        this.markBeg = 0;
        this.markEnd = 0;
        this.time = '';
        this.timer = '';
        this.status = 'initial';
    }

    newNode() {
        let e = defaultNode.cloneNode(true);
        e.id += this.id;
        for (let i = 0; i < e.children.length; i++) {
            e.children[i].setAttribute("data-id", `stopwatch-${this.id}`);
            e.children[i].id += this.id;
        }
        this.parent.append(e);
        e.children[0].textContent = this.name;
        this.box = document.getElementById(`stopwatch-${this.id}`);
        this.time = this.searchBy("time")[0];
    }

    run() {
        this.searchBy("start")[0].addEventListener('click', this.btnStart.bind(this));
        this.searchBy("lap")[0].addEventListener('click', this.getLap.bind(this));
        this.searchBy("reset")[0].addEventListener('click', this.timeReset.bind(this));
        this.status = "ready";
    }

    btnStart() {
        if (this.status === "ready") {
            this.timeStart();
        } else if (this.status === "running") {
            this.timePause();
        } else if (this.status === "pause") {
            this.timeContinue();
        }
        return "error"
    }

    timeStart() {
        this.markBeg = Date.now();
        this.timer = setInterval(() => {
            this.time.innerText = Stopwatch.toTimeForm(Date.now() - this.markBeg);
        }, 100);
        this.searchBy("start")[0].innerText = "Pause";
        this.status = "running";
    }

    timePause() {
        this.markEnd = Date.now();
        clearInterval(this.timer);
        this.searchBy("start")[0].innerText = "Continue";
        return this.status = "pause";
    }

    timeContinue() {
        this.markBeg = this.markBeg + (Date.now() - this.markEnd);
        this.timer = this.timer = setInterval(() => {
            this.time.innerText = Stopwatch.toTimeForm(Date.now() - this.markBeg);
        }, 100);
        this.searchBy("start")[0].innerText = "Pause";
        this.status = "running";
    }

    timerGo() {

    }

    timeReset() {
        clearInterval(this.timer);
        this.searchBy("laps")[0].innerHTML = ' ';
        this.time.innerText = "00:00.0";
        this.searchBy("start")[0].innerText = "Start";
        this.markBeg = 0;
        this.markEnd = 0;
        return this.status = "ready";
    }

    getLap() {
        if (this.status !== "ready" && this.time.innerText !== this.searchBy("laps")[0].firstChild.innerText) {
            this.searchBy("laps")[0].insertAdjacentHTML('afterbegin', `<li>${this.time.innerText}</li>`);
            return this.time.innerText;
        } else {
            let lap = this.searchBy("laps")[0].firstChild;
            lap.style = "color: red";
            console.log(lap, lap.style);
            setTimeout(() => lap.style = "", 1000)
        }
        return "error";
    }

    searchBy(selector) {
        return this.box.querySelectorAll(`[data-id=stopwatch-${this.id}][data-type=${selector}]`);
    }

    static toTimeForm(timestamp) {
        let date = new Date(timestamp);
        let msec = Math.floor(date.getMilliseconds() / 100);
        let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return `${min}:${sec}.${msec}`;
    }
}

const defaultNode = document.getElementById("stopwatch-");
let arrStopwatches = [];
let cnt = 1;

function getAttr() {
    let input = document.getElementById("maker").children[0];
    return input.value.split("; ", 2);
}

function clearAttr() {
    let input = document.getElementById("maker").children[0];
    input.value = "";
}

function setStopwatch() {
    let arr = getAttr();
    if (arr[1]) {
        arrStopwatches.push(new Stopwatch(document.getElementById(arr[1])));
        console.log(document.getElementById(arr[1]));
    } else {
        arrStopwatches.push(new Stopwatch());
    }
    cnt === 1 ? document.getElementById("maker").className = "used" : null;
    if (arr[0]) {
        arrStopwatches[cnt - 1].name = arr[0];
    }
    arrStopwatches[cnt - 1].newNode();
    arrStopwatches[cnt - 1].run();
    clearAttr();

    cnt++;
}

document.getElementById("maker").children[1].addEventListener('click', setStopwatch);

