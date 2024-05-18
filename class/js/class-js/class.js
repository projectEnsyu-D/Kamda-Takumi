let data = {};

window.onload = function() {
    shutoku();
};

function shutoku() {
    let lokal = localStorage.getItem("table_data");
    if (lokal) {
        data = JSON.parse(lokal);
        console.log(lokal);
        restoreTable(data);
    }
}

function saveClass() {
    let className = document.getElementById("class-name").value;
    let dayOfWeek = document.getElementById("day-of-week").value;
    let time = document.getElementById("time").value;
    let unit = document.getElementById("unit").value;
    let room = document.getElementById("room").value;

    let cellId = getCellId(dayOfWeek, time);
    let cell = document.getElementById(cellId);
    if (cell) {
        cell.innerHTML = `${className} (${room})`;
        // データをlocalStorageに保存する
        let cellData = { className: className, dayOfWeek: dayOfWeek, time: time, unit: unit, room: room };
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

function restoreTable(data) {
    for (let k in data) {
        let cell = document.getElementById(k);
        if (cell) {
            cell.innerHTML = data[k];
        }
    }
}





