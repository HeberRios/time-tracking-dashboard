// SELECTING ELEMENTS

const timeFrameOptions = document.querySelectorAll("[name='timeframe']");
const defaultOptionLabel = document.querySelector(".checked");
const currentTimeframeHours = document.querySelectorAll(".timeframe-hours");
const previousTimeFrameHours = document.querySelectorAll(
    ".previous-timeframe-hours"
);

// FUNCTIONS

function setTimeframeData(timeframeDataArray, timeframeOptionValue) {
    if (timeframeOptionValue === "daily") {
        timeframeDataArray.forEach(function (activityData, index) {
            currentTimeframeHours[
                index
            ].textContent = `${activityData.current}hrs`;
            previousTimeFrameHours[
                index
            ].textContent = `Yesterday - ${activityData.previous}hrs`;
        });
    } else if (timeframeOptionValue === "weekly") {
        timeframeDataArray.forEach(function (activityData, index) {
            currentTimeframeHours[
                index
            ].textContent = `${activityData.current}hrs`;
            previousTimeFrameHours[
                index
            ].textContent = `Last Week - ${activityData.previous}hrs`;
        });
    } else {
        timeframeDataArray.forEach(function (activityData, index) {
            currentTimeframeHours[
                index
            ].textContent = `${activityData.current}hrs`;
            previousTimeFrameHours[
                index
            ].textContent = `Last Month - ${activityData.previous}hrs`;
        });
    }
}

async function getDailyData(timeframeOption) {
    const response = await fetch("./json/data.json");
    const data = await response.json();

    const dataArray = new Array();

    data.forEach(function (activity) {
        dataArray.push(activity["timeframes"]["daily"]);
    });

    setTimeframeData(dataArray, timeframeOption);
}

async function getWeeklyData(timeframeOption) {
    const response = await fetch("./json/data.json");
    const data = await response.json();

    const dataArray = new Array();

    data.forEach(function (activity) {
        dataArray.push(activity["timeframes"]["weekly"]);
    });

    setTimeframeData(dataArray, timeframeOption);
}

async function getMonthlyData(timeframeOption) {
    const response = await fetch("./json/data.json");
    const data = await response.json();

    const dataArray = new Array();

    data.forEach(function (activity) {
        dataArray.push(activity["timeframes"]["monthly"]);
    });

    setTimeframeData(dataArray, timeframeOption);
}

// ADD EVENT LISTENER TO THE TIMEFRAME OPTIONS

timeFrameOptions.forEach(function (option) {
    option.addEventListener("click", function (e) {
        defaultOptionLabel.classList.remove("checked");
        if (e.target.value === "daily") {
            getDailyData(e.target.value);
        } else if (e.target.value === "weekly") {
            getWeeklyData(e.target.value);
        } else {
            getMonthlyData();
        }
    });
});

// SHOW WEEKLY DATA AT THE BEGINNING

getWeeklyData("weekly");
