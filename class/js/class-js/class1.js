let data = {};

window.onload = function () {
  loadData();
  WeekDay();
};

function loadData() {
  let lokal = localStorage.getItem("table_data");
  if (lokal) {
    data = JSON.parse(lokal);
    displaySavedData(data);
  }
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
    ["a", "b", "c", "d", "e"].forEach(function (d) {
      var cell = document.getElementById(d + i);
      if (cell) {
        cell.style.display = d === prefix ? "" : "none";
      }
    });
  }
}