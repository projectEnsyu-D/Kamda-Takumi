let data = {};

window.onload = function () {//ページを読み込んだ時にこれを呼び出す
  loadData();
  WeekDay();
};

function loadData() {//ページを読み込む
  let local = localStorage.getItem("table_data");
  if (local) {
    data = JSON.parse(local);
    displaySavedData(data);
  }
}

function getDayOfWeekFromCellId(cellId) {//曜日とa~eを対応させる
  let days = { "a": "月", "b": "火", "c": "水", "d": "木", "e": "金" };
  return days[cellId];
}

function displaySavedData(data) {//ディスプレイを表示する
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

function WeekDay() {//曜日に合わせたセルを表示する
  var today = new Date();
  var weekday = ["日", "月", "火", "水", "木", "金", "土"];
  var day = weekday[today.getDay()];
  var wday = day + "曜日";

  document.getElementById("weekday").innerText = "今日は " + wday;

  if (day === "土" || day === "日") {
    for (var i = 1; i <= 6; i++) {
      ["a", "b", "c", "d", "e"].forEach(function (d) {
        var cell = document.getElementById(d + i);
        if (cell) {
          cell.style.display = d === prefix ? "" : "none";
        }
      });
    }
  } else {
    var prefix = { "月": "a", "火": "b", "水": "c", "木": "d", "金": "e" }[day];
    for (var i = 1; i <= 6; i++) {
      ["a", "b", "c", "d", "e", "f"].forEach(function (d) {
        var cell = document.getElementById(d + i);
        if (cell) {
          cell.style.display = d === prefix ? "" : "none";
        }
      });
    }
  }
}

