/*ここからはローカルストレージ*/
let data = {}
let dayOfWeek
//window.onload = shutoku;
window.onload = function() {
    data - new Date()
    dayOfWeek = date.getDay()
}

function shutoku() {
    let lokal = localStorage.getItem("table_data")
    data = JSON.parse(lokal)
    console.log(lokal)
}

function clicked(id) {
    let cell = document.getElementById(id)
    let inputCell = document.getElementById("subject")
    console.log(inputCell.value)
    data[id] = inputCell.value
    cell.innerHTML = inputCell.value
    let table = data[id]
    localstorage.setItem("table_data",JSON.stringify(data))
    console.log(data)
}
function finished() {
    let inputCell = document/getElementbyId("subject")
    inputCell.style.visibility = "hidden"
}

function restoreTable(data) {
    //console.log(data)
    for (let k in data){
        let cell = documet.getElementbyId(k)
        let col = k[0]
        let colLeft = {"a" : "e" , "b" : "a" , "c" : "b" , "d" : "c" , "e" : "d"}[col]
        cell.innerHTML = data[k]
        for (var i = 1;i<7; i++){
            var cellLeft = colLeft + String(i)
            if (data[cellLeft] == data[k]) {
                cell.innerHTML = "()" + data[k]//これが前日と同じ
            }
        }
        console.log(col, colLeft, cellLeft)
    }
}