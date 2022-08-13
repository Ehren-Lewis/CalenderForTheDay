// import moment from 'moment';
// var moment = require('moment');
// const time = moment().format("dddd, MMMM  Do, YYYY");
// console.log(time);

// const hour = moment().format("hh");

const hour = 11;


const timeArray = ['AM', 'PM'];

const newTimeArray = [9, 10, 11 , 12, 1, 2, 3, 4, 5]
const finalTimerArray = [];

for (let i = 0; i < newTimeArray.length; i++) {
    if ( newTimeArray[i] < 6) {
        finalTimerArray.push(`${newTimeArray[i]}PM`);
    } else {
        finalTimerArray.push(`${newTimeArray[i]}AM`);
    }
}

const localStorageGetter = () => {
    const currentStorage = localStorage;
    if (currentStorage) {
        return currentStorage;
    }
}

const localStorageArray = [];

var reachedCurrentTime = false;

const container = $(".container");

for (let i = 0; i < finalTimerArray.length; i++) {
    const currentStorage = localStorageGetter();

    const toAppend = $("<div class='row'></div>");


    const childTime = $("<div class='col-1'></div>");
    childTime.text(finalTimerArray[i]);

    childTime.addClass("d-flex align-items-center justify-content-center hour");
    const testInput = $("<textarea class='col-10 description'></textarea");

    if (!reachedCurrentTime) {
        testInput.addClass("past");
        if ( newTimeArray[i] == hour) {
        reachedCurrentTime = true;
        testInput.removeClass("past");
        testInput.addClass("present");
        }
    } else if (!reachedCurrentTime == false) {
        testInput.addClass("future");
    } 


    // if (currentStorage.getItem(finalTimerArray[i])) { 
        // testInput.val(currentStorage.getItem(finalTimerArray[i]));
    // }


    const saveButtonCol = $("<div class='col-1'></div>");
    saveButtonCol.addClass("saveBtn");
    saveButtonCol.append("<i class='fas fa-save'></i>");


    // Set localstorage function
    saveButtonCol.on('click', (e) => {
        const textTarget = $(e.target).siblings(".col-10").val();
        const localKey = $(e.target).siblings(".col-1").text();
        const key = "8-12-2022";
        const currentStorageArray = localStorage.getItem(key);
        let  parsedStorage = JSON.parse(currentStorageArray);
        // const alreadyKeys = Objects.keys(parsedStorage);
        
        const timeAndMessage = {time: localKey, "text": textTarget};

        let appendArray = [];

        if (parsedStorage != null) {
            appendArray = parsedStorage;
        }

        // console.log(Object.values(parsedStorage).includes("12AM"));

        // The values are now as if it returned Object.entries 
        // console.log(Object.values(parsedStorage));
        if (parsedStorage) {
            for (let i = 0; i < parsedStorage.length; i++) {
                // console.log(parsedStorage[i]);
                console.log(Object.values(parsedStorage[i]));
                if (Object.values(parsedStorage[i]).includes("12AM")) {
                    parsedStorage[i] = timeAndMessage;
            
                }
            }
    }
    
        appendArray.push(timeAndMessage);

        localStorage.setItem(key, JSON.stringify(appendArray));
        
    });



    toAppend.append(childTime);
    toAppend.append(testInput);
    toAppend.append(saveButtonCol);
    container.append(toAppend);
}
// The code will be built dynamically 
// There are 3 main things that you need, 
// the Time, the input Text, and the save button. 
// Event that have already happened are grey 
// The current hour is red 
// The future hours are green


