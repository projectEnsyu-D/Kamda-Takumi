/*ローカルストレージ*/
let data = {};

    window.onload = function () {//ページを読み込んだ時にこれを呼び出す
      loadData();
      displayNextClass();
    };

    function loadData() {//ページを読み込む
      let local = localStorage.getItem("table_data");
      if (local) {
        data = JSON.parse(local);
        displaySavedData(data);
      }
    }

    function resetData() {// ページをリロードしてリセットを反映
        localStorage.clear();    
        location.reload();
    }

    function saveClass() {//セル情報を記憶する
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

    function getCellId(dayOfWeek, time) {//曜日と何限目かを取得する
      let days = { "月": "a", "火": "b", "水": "c", "木": "d", "金": "e" };
      if (days[dayOfWeek] && time >= 1 && time <= 6) {
        return days[dayOfWeek] + time;
      }
      return null;
    }

    function clicked(id) {//クリックするとday-of-weekとtimeを取得する
      let cell = document.getElementById(id);
      let dayOfWeek = getDayOfWeekFromCellId(id[0]);
      let time = id[1];

      document.getElementById("day-of-week").value = dayOfWeek;
      document.getElementById("time").value = time;
    }

    function getDayOfWeekFromCellId(cellId) {//曜日とa~eを対応させる
      let days = { "a": "月", "b": "火", "c": "水", "d": "木", "e": "金" };
      return days[cellId];
    }

    function displaySavedData(data) {//入力したデータを表示する
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

    