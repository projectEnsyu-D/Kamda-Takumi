/*ローカルストレージ*/
let data = {};

    window.onload = function () {
      loadData();
      displayNextClass();
    };

    function loadData() {
      let lokal = localStorage.getItem("table_data");
      if (lokal) {
        data = JSON.parse(lokal);
        displaySavedData(data);
      }
    }

    function resetData() {
        localStorage.clear();
        location.reload(); // ページをリロードしてリセットを反映
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
        cell.innerHTML = `${className} ${room}`;
        let cellData = { className, dayOfWeek, time, building, room };
        data[cellId] = cellData;
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

    