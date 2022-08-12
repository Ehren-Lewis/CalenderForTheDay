// import moment from 'moment';
// var moment = require('moment');
// const time = moment().format("dddd, MMMM  Do, YYYY");
// console.log(time);



const standardTimeDivider = 12;
const timeArray = ['AM', 'PM'];


const finalTimerArray = [];

for( let i = 0; i < timeArray.length; i++) {
    for (let j = 0; j < standardTimeDivider; j ++) {
        if (j == 0 ) {
        finalTimerArray.push(`${12}${timeArray[i]}`);
        }
        else {
            finalTimerArray.push(`${j}${timeArray[i]}`);
        }
    }
}

console.log(finalTimerArray);

const container = $(".container");

for (let i = 0; i < finalTimerArray.length; i++) {
    const toAppend = $("<div class='row'></div>");
    toAppend.css("border", "1px solid black");

    const childTime = $("<div class='col-1'></div>");
    childTime.text(finalTimerArray[i]);
    childTime.addClass("d-flex align-items-center justify-content-center");
    const textField = $("<div class='col-10'></div>");
    const saveButtonCol = $("<div class='col-1'></div>");
    saveButtonCol.addClass("bg-success");

    saveButtonCol.on('click', (e) => {
        // console.log(e);
        console.log($(e.target).siblings(".col-1").text());
        // const 
    });

    // const saveButton = $("<button class='btn btn-primary'></button>");
    // saveButton.css("width", "inheret")
    // saveButtonCol.append(saveButton);

    childTime.css("border", "1px solid blue");
    textField.css("border", "1px solid yellow");
    // saveButtonCol.css("border", "1px solid orange");

    toAppend.append(childTime);
    toAppend.append(textField);
    toAppend.append(saveButtonCol);
    container.append(toAppend);
}
// The code will be built dynamically 
// There are 3 main things that you need, 
// the Time, the input Text, and the save button. 
// Event that have already happened are grey 
// The current hour is red 
// The future hours are green

// div row
// div col-1: stores time;
// dive col-10: stores text componenet
// div col-1: stores save

