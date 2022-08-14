const hour = 11;
const date = new Date();
const timeArray = ['AM', 'PM'];
const newTimeArray = [9, 10, 11 , 12, 1, 2, 3, 4, 5]
const finalTimerArray = [];



const months = ['January', 'February', 'March', 'April', 'May', 'June',
'July', 'August', 'September', 'October', 'Novermber', 'December'];

const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const todayKey = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

const today = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

$("#currentDay").text(`${day[date.getDay(today)]} ${today}`);

let hours = date.getHours(today);

if (hours > 12) {
    hours = hours - 12;
}

console.log(hours)

for (let i = 0; i < newTimeArray.length; i++) {
    if ( newTimeArray[i] < 6 || newTimeArray[i] == 12) {
        finalTimerArray.push(`${newTimeArray[i]}PM`);
    } else {
        finalTimerArray.push(`${newTimeArray[i]}AM`);
    }
}

const localStorageGetter = () => {
    const currentStorage = localStorage.getItem(todayKey);
    if (currentStorage) {
        return JSON.parse(currentStorage);
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

    if (currentStorage) {
        for (let j = 0; j < currentStorage.length; j++) {
            if (Object.values(currentStorage[j])[0].includes(finalTimerArray[i])) {
                testInput.text(Object.values(currentStorage[j])[1]);
            }
        }
    }


    if (!reachedCurrentTime) {
        testInput.addClass("past");
        if ( newTimeArray[i] == hours) {
        reachedCurrentTime = true;
        testInput.removeClass("past");
        testInput.addClass("present");
        }
    } else if (!reachedCurrentTime == false) {
        testInput.addClass("future");
    } 



    const saveButtonCol = $("<div class='col-1'></div>");
    saveButtonCol.addClass("saveBtn");
    saveButtonCol.append("<i class='fas fa-save'></i>");

    $(".fas").on('click', () => {
    })




    // Set localstorage function
    saveButtonCol.on('click', (e) => {
        if ($(e.target).attr("class") == "fas fa-save") {
            var textTarget = $(e.target).parent().siblings(".col-10").val();
            var localKey = $(e.target).parent().siblings(".col-1").text();

        } else {
            var textTarget = $(e.target).siblings(".col-10").val();
            var localKey = $(e.target).siblings(".col-1").text();

        }


        const currentStorageArray = localStorage.getItem(todayKey);
        let  parsedStorage = JSON.parse(currentStorageArray);

        const timeAndMessage = {time: localKey, "text": textTarget};
   
        appender = [];
        if (parsedStorage) {
            appender = parsedStorage;
        }

        for (let i = 0; i < appender.length; i++) {
            if (Object.values(appender[i])[0].includes(timeAndMessage.time)) {
                appender[i] = timeAndMessage;
                localStorage.setItem(todayKey, JSON.stringify(appender));
                return;
            }
        }

        appender.push(timeAndMessage);

        localStorage.setItem(todayKey, JSON.stringify(appender));


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


