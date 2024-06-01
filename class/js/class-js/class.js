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

    function displayNextClass() {
        let now = new Date();
        let currentDay = now.getDay();
        let currentHour = now.getHours();
        let currentMinute = now.getMinutes();
        let timeSlots = [
          { start: 9, end: 10.5 },
          { start: 10.5, end: 12 },
          { start: 12, end: 13.5 },
          { start: 13.5, end: 15 },
          { start: 15, end: 16.5 },
          { start: 16.5, end: 18 }
        ];
      
        let weekday = ["日", "月", "火", "水", "木", "金", "土"];
        let currentDayLabel = weekday[currentDay];
        let days = { "日": "a", "月": "a", "火": "b", "水": "c", "木": "d", "金": "e", "土": "a" };
        let currentPrefix = days[currentDayLabel];
      
        let nextSlotFound = false;
        let nextDay = (currentDay + 1) % 7;
      
        if (currentDay === 0 || currentDay === 6) {
          document.getElementById("timeroom").innerText = "土曜日と日曜日は授業がありません。";
          hideAllAreas();
          return;
        }
      
        for (let i = 0; i < timeSlots.length; i++) {
          if (currentHour + currentMinute / 60 < timeSlots[i].end) {
            let cellId = currentPrefix + (i + 1);
            let cellData = data[cellId];
            if (cellData) {
              document.getElementById("timeroom").innerText = `今日の次の授業（${cellData.className}）は${cellData.building}号館${cellData.room}室です。`;
              showArea(cellData.building);
              nextSlotFound = true;
              break;
            }
          }
        }
      
        if (!nextSlotFound) {
          for (let i = 0; i < timeSlots.length; i++) {
            let nextCellId = days[weekday[nextDay]] + (i + 1);
            let nextCellData = data[nextCellId];
            if (nextCellData) {
              document.getElementById("timeroom").innerText = `明日の授業（${nextCellData.className}）は${nextCellData.building}号館${nextCellData.room}室です。`;
              showArea(nextCellData.building);
              nextSlotFound = true;
              break;
            }
          }
        }
      
        if (!nextSlotFound) {
          document.getElementById("timeroom").innerText = "次の授業が見つかりませんでした。";
        }
      }
      
      function showArea(building) {
        for (let i = 1; i <= 18; i++) {
          let area  = document.getElementById(`area${i}`);
          if (area) {
            area.style.display = (building && i == building) ? "block" : "none";
          }
        }
      }
      
      function hideAllAreas() {
        for (let i = 1; i <= 18; i++) {
          let area = document.getElementById(`area${i}`);
          if (area) {
            area.style.display = "none";
          }
        }
      }