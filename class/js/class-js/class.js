/*ローカルストレージ*/
let data = {};

window.onload = function () {
    WeekDay();
    shutoku();
    displayNextClass();
  };

function shutoku() {
    let lokal = localStorage.getItem("table_data");
    if (lokal) {
        data = JSON.parse(lokal);
        console.log(lokal);
        displaySavedData(data);
    }
}

function saveClass() {
    let className = document.getElementById("class-name").value;
    let dayOfWeek = document.getElementById("day-of-week").value;
    let time = document.getElementById("time").value;
    let building = document.getElementById("building").value;
    let room = document.getElementById("room").value;

    let cellId = getCellId(dayOfWeek, time);
    let cell = document.getElementById(cellId);
    if (cell) {
        cell.innerHTML = `${className} (${room})`;
        // データをlocalStorageに保存する
        let cellData = { className: className, dayOfWeek: dayOfWeek, time: time, building: building, room: room };
        data[cellId] = cellData; // オブジェクト形式で保存

        localStorage.setItem("table_data", JSON.stringify(data));
    }
}

function getCellId(dayOfWeek, time) {
    let days = { "月": "a", "火": "b", "水": "c", "木": "d", "金": "e" };
    if (days[dayOfWeek] && time >= 1 && time <= 6) {
        return days[dayOfWeek] + time;
    }
    return null;
}

function clicked(id) {
    let cell = document.getElementById(id);
    let dayOfWeek = getDayOfWeekFromCellId(id[0]);
    let time = id[1];

    document.getElementById("day-of-week").value = dayOfWeek;
    document.getElementById("time").value = time;
}

function getDayOfWeekFromCellId(cellId) {
    let days = { "a": "月", "b": "火", "c": "水", "d": "木", "e": "金" };
    return days[cellId];
}

function displaySavedData(data) {
    for (let cellId in data) {
        let cell = document.getElementById(cellId);
        if (cell) {
            let cellData = data[cellId];
            if (cellData) {
                let { className, room } = cellData;
                cell.innerHTML = `${className} ${room}`;
            }
        }
    }
}

function WeekDay() {
    var today = new Date();
    var weekday = ["日", "月", "火", "水", "木", "金", "土"];
    var days = { "日": "a", "月": "a", "火": "b", "水": "c", "木": "d", "金": "e", "土": "a" };
    var day = weekday[today.getDay()];
    var prefix = days[day];
    var wday = day + "曜日";

    document.getElementById("weekday").innerText = "今日は " + wday;

    for (var i = 1; i <= 6; i++) {
        ["a", "b", "c", "d", "e"].forEach(function(d) {
            var cell = document.getElementById(d + i);
            if (cell) {
                cell.style.display = d === prefix ? "" : "none";
            }
        });
    }
}

/*ここからはMAP*/

function displayNextClass() {
    let now = new Date();
    let currentDay = now.getDay();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    let timeSlots = [
        { start: 9, end: 10.5 },    // 1st period (9:00-10:30)
        { start: 10.5, end: 12 },   // 2nd period (10:30-12:00)
        { start: 12, end: 13.5 },   // 3rd period (12:00-13:30)
        { start: 13.5, end: 15 },   // 4th period (13:30-15:00)
        { start: 15, end: 16.5 },   // 5th period (15:00-16:30)
        { start: 16.5, end: 18 }    // 6th period (16:30-18:00)
    ];

    let weekday = ["日", "月", "火", "水", "木", "金", "土"];
    let currentDayLabel = weekday[currentDay];
    let days = { "日": "a", "月": "a", "火": "b", "水": "c", "木": "d", "金": "e", "土": "a" };
    let currentPrefix = days[currentDayLabel];

    let nextSlotFound = false;
    for (let i = 0; i < timeSlots.length; i++) {
        if (currentHour + currentMinute / 60 < timeSlots[i].end) {
            let cellId = currentPrefix + (i + 1);
            let cellData = data[cellId];
            if (cellData) {
                document.getElementById("timeroom").innerText = `次の授業（${cellData.className}）は${cellData.building}号館${cellData.room}室です。`;
            } else {
                for (let j = i + 1; j < timeSlots.length; j++) {
                    let nextCellId = currentPrefix + (j + 1);
                    let nextCellData = data[nextCellId];
                    if (nextCellData) {
                        document.getElementById("timeroom").innerText = `次の授業（${nextCellData.className}）は${nextCellData.building}号館${nextCellData.room}室です。`;
                        nextSlotFound = true;
                        break;
                    }
                }
            }
            if (nextSlotFound) {
                break;
            }
        }
    }
}


