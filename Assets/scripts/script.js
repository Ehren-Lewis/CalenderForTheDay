
// Defining all of the time variables
// as well as all the formatting for the date
const date = new Date();
const timeArray = ['AM', 'PM'];
const timeArrayUnformatted = [9, 10, 11 , 12, 1, 2, 3, 4, 5]
const timeArrayFormatted = [];
const months = ['January', 'February', 'March', 'April', 'May', 'June',
'July', 'August', 'September', 'October', 'Novermber', 'December'];
const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const todayKey = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
const today = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

$("#currentDay").text(`${day[date.getDay(today)]} ${today}`);

let hours = date.getHours(today);

// Change from military time 
if (hours > 12) {
    hours = hours - 12;
}
// formatting the hours in a work day
for (let i = 0; i < timeArrayUnformatted.length; i++) {
    if ( timeArrayUnformatted[i] < 6 || timeArrayUnformatted[i] == 12) {
        timeArrayFormatted.push(`${timeArrayUnformatted[i]}PM`);
    }
     else {
        timeArrayFormatted.push(`${timeArrayUnformatted[i]}AM`);
    }
}

// Used for checking if there is any infromation in the local storage
const localStorageGetter = () => {
    const currentStorage = localStorage.getItem(todayKey);
    if (currentStorage) {
        return JSON.parse(currentStorage);
    }
}

var reachedCurrentTime = false;
const container = $(".container");
const currentStorage = localStorageGetter();

for (let i = 0; i < timeArrayFormatted.length; i++) {

    // Creating each row for each hour in a work day
    const timeRow = $("<div class='row'></div>");

    const timeArea = $("<div class='col-1'></div>");
    timeArea.text(timeArrayFormatted[i]);

    timeArea.addClass("d-flex align-items-center justify-content-center hour");
    const textArea = $("<textarea class='col-10 description'></textarea");

    if (currentStorage) {
        for (let j = 0; j < currentStorage.length; j++) {
            if (currentStorage[j].time == timeArrayFormatted[i]) {
                textArea.text(Object.values(currentStorage[j])[1]);
            }
        }
    }

    if (!reachedCurrentTime) {
        textArea.addClass("past");
        if ( timeArrayUnformatted[i] == hours) {
        reachedCurrentTime = true;

        // Since nested in an if statement, it must be removed
        // for the current time element
        textArea.removeClass("past");
        textArea.addClass("present");
        }
    } else if (!reachedCurrentTime == false) {
        textArea.addClass("future");
    } 

    const saveButtonCol = $("<div class='col-1'></div>");
    saveButtonCol.addClass("saveBtn");
    saveButtonCol.append("<i class='fas fa-save'></i>");

    // Used for event bubbling on the icon
    $(".fas").on('click', () => {
    })

    // Set localstorage function
    saveButtonCol.on('click', (e) => {

        // An if else to determine if the icon or field itself was clicked
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
   
        // Appender is used to make it where you can update the messages
        // and have more than one text information stored in a day 
        appender = [];
        if (parsedStorage) {
            appender = parsedStorage;
        }

        // Checks to see if there is a certain time value in an array 
        // if there is then it will overwrite it instead of appending to the message 
        for (let i = 0; i < appender.length; i++) {
                if (appender[i].time == timeArrayFormatted[i]) {
                appender[i] = timeAndMessage;
                localStorage.setItem(todayKey, JSON.stringify(appender));
                return;
            }
        }

        appender.push(timeAndMessage);
        localStorage.setItem(todayKey, JSON.stringify(appender));

    });

    // Adding all of the buttons to the DOM 
    timeRow.append(timeArea);
    timeRow.append(textArea);
    timeRow.append(saveButtonCol);
    container.append(timeRow);
}



