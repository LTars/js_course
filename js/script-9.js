class Stopwatch {
    constructor(parent = document.body) {
        this.id = cnt;
        this.box = '';
        this.msec = 0;
        this.time = "00:00.0";
        this.timer = '';
        this.status = 'initial';
        this.newNode(parent);
        this.run();
    }

    newNode(parent) {
        let e = defaultNode.cloneNode(true);
        e.id += this.id;
        for (let i = 0; i < e.children.length; i++) {
            e.children[i].setAttribute("data-id", `stopwatch-${this.id}`);
            e.children[i].id += this.id;
        }
        parent.append(e);
        e.children[0].textContent = "#" + this.id;
        this.box = document.getElementById(`stopwatch-${this.id}`);
    }

    run() {
        this.searchBy("start")[0].addEventListener('click', this.timeGo.bind(this));
        this.searchBy("lap")[0].addEventListener('click', this.getLap.bind(this));
        this.searchBy("reset")[0].addEventListener('click', this.timeReset.bind(this));
        this.status = "ready";
    }

    timeGo() {
        if (this.status === "ready" || this.status === "pause") {
            let reffer = this;
            this.timer = setInterval(function () {
                reffer.msec += 1;
                reffer.time = reffer.toTimeForm(reffer.msec);
                reffer.searchBy("time")[0].innerText = reffer.time;
            }, 100);
            this.searchBy("start")[0].innerText = "Pause";
            return this.status = "running";
        } else if (this.status === "running") {
            this.timePause();
        }
        return "error"
    }

    toTimeForm(timestamp) {
        let date = new Date(timestamp * 100);
        let msec = date.getMilliseconds() / 100;
        let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return `${min}:${sec}.${msec}`;
    }

    timePause() {
        clearInterval(this.timer);
        this.searchBy("start")[0].innerText = "Continue";
        return this.status = "pause";
    }

    /*
        timeStop() {
            if (this.status === "stopped") {
                this.timeReset()
            } else if (this.status !== "ready" && this.status !== "initial") {
                clearInterval(this.timer);
                this.searchBy("stop")[0].innerText = "Reset";
                return this.status = "stopped";
            }
        }
    */

    timeReset() {
        clearInterval(this.timer);
        this.searchBy("laps")[0].innerHTML = ' ';
        this.msec = 0;
        this.time = "00:00.0";
        this.searchBy("time")[0].innerText = this.time;
        this.searchBy("start")[0].innerText = "Start";
        // this.searchBy("stop")[0].innerText = "Stop";
        return this.status = "ready";
    }

    getLap() {
        if (this.status !== "ready" && this.time !== this.searchBy("laps")[0].firstChild.innerText) {
            this.searchBy("laps")[0].insertAdjacentHTML('afterbegin', `<li>${this.time}</li>`);
            return this.time;
        }
        return "error";
    }

    searchBy(selector) {
        return this.box.querySelectorAll(`[data-id=stopwatch-${this.id}][data-type=${selector}]`);
    }
}

const defaultNode = document.getElementById("stopwatch-");
let arrStopwatches = {};
let cnt = 1;

function setStopwatch(label = "time" + cnt, parent) {
    arrStopwatches[label] = new Stopwatch(parent);
    if (cnt === 1) {
        document.getElementById("maker").className = "used";
    }
    cnt++;
}

document.getElementById("maker").addEventListener('click', setStopwatch);

