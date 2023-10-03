var Countdown = (function () {
    let labels = [];

    function getTimeRemaining(startTime, endTime, tillWhen = 'tillDay') {
        // let startTime = Date.now();
        let totalSec = Math.floor(((endTime - Date.now()) / 1000));
        let secondsLeft = ""
        let minutesLeft = ""
        let hoursLeft = ""
        let daysLeft = "";
        let monthsLeft = "";
        console.log(totalSec)

        if (tillWhen === 'tillMonth') {
            secondsLeft = Math.floor(totalSec % 60);
            minutesLeft = Math.floor((totalSec / 60) % 60);
            hoursLeft = Math.floor((totalSec / 60 / 60) % 24);
            daysLeft = Math.floor((totalSec / 3600 / 24) % 30);
            monthsLeft = Math.floor(totalSec / (60 * 60 * 24 * 30));
            return {
                untill: 'month',
                months: monthsLeft,
                days: daysLeft,
                hours: hoursLeft,
                minutes: minutesLeft,
                seconds: secondsLeft
            };
        } else if (tillWhen === 'tillDay') {
            secondsLeft = Math.floor(totalSec % 60);
            minutesLeft = Math.floor((totalSec / 60) % 60);
            hoursLeft = Math.floor((totalSec / 60 / 60) % 24);
            daysLeft = Math.floor((totalSec / 3600) / 24);
            return {
                untill: 'day',
                days: daysLeft,
                hours: hoursLeft,
                minutes: minutesLeft,
                seconds: secondsLeft
            };
        } else if (tillWhen == 'tillHour') {
            secondsLeft = Math.floor(totalSec % 60);
            minutesLeft = Math.floor((totalSec / 60) % 60);
            hoursLeft = Math.floor((totalSec / 60 / 60));
            return {
                untill: 'hour',
                hours: hoursLeft,
                minutes: minutesLeft,
                seconds: secondsLeft
            };
        } else if (tillWhen == 'tillMin') {
            secondsLeft = Math.floor(totalSec % 60);
            minutesLeft = Math.floor((totalSec / 60));
            return {
                untill: 'minute',
                minutes: minutesLeft,
                seconds: secondsLeft
            };
        } else if (tillWhen == 'tillSec') {
            secondsLeft = Math.floor(totalSec);
            return {
                untill: 'second',
                seconds: secondsLeft
            };
        }
    }
    /**
     * Updates the countdown based on the target date.
     *
     * @return {undefined} This function does not return a value.
     */
    function updateCountdown(startDate, endDate, when, targetElement) {
        var time = getTimeRemaining(startDate, endDate, when);
        console.log('time', time)
        let countdownText = '';
        

        if (time?.untill == 'month') {
            countdownText = countdownMarkup(time, labels); 
        } else if (time?.untill == 'day') {
            countdownText = countdownMarkup(time, labels);
        } else if (time?.untill == 'hour') {
            countdownText = countdownMarkup(time, labels);
        } else if (time?.untill == 'minute') {
            countdownText = countdownMarkup(time, labels);
        } else if (time?.untill == 'second') {
            countdownText = countdownMarkup(time, labels);
        }

        console.log('text',countdownText)
        targetElement.innerHTML = countdownText;
    }

    function countdownMarkup(time, timerNames) {
        console.log(time, timerNames)
        let month = `<div class="block month-block">
        <p class="digit" id="months">${time?.months}</p>
        <p class="label label-month">${timerNames && timerNames?.month ? timerNames?.month : 'Months'}</p>
    </div>`;
        let day = `<div class="block day-block">
                        <p class="digit" id="days">${time?.days}</p>
                        <p class="label label-day">${timerNames && timerNames?.day ? timerNames?.day : 'Days'}</p>
                    </div>`;

        let hour = `<div class="block hour-block">
        <p class="digit" id="hours">${time?.hours}</p>
        <p class="label label-hour">${timerNames && timerNames?.hour ? timerNames?.hour : 'Hours'}</p>
    </div>`;

        let minute = `<div class="block minute-block">
    <p class="digit" id="minutes">${time?.minutes}</p>
    <p class="label label-minute">${timerNames && timerNames?.minute ? timerNames?.minute : 'Minutes'}</p>
</div>`;

        let second = ` <div class="block second-block">
<p class="digit" id="seconds">${time?.seconds}</p>
<p class="label label-second">${timerNames && timerNames?.second ? timerNames?.second : 'Seconds'}</p>
</div>`;


        if (time?.untill === 'month') {
            return `<div id="clock"> ${month} ${day} ${hour} ${minute} ${second} </div>`
        } else if(time?.untill === 'day'){
            return `<div id="clock"> ${day} ${hour} ${minute} ${second} </div>`
        
        } else if(time?.untill === 'hour'){
            return `<div id="clock">${hour} ${minute} ${second} </div>`
        
        } else if(time?.untill === 'minute'){
            return `<div id="clock">${minute} ${second} </div>`
        }
    }

    // <p class="met-sales-countdown-time-separator"></p>

    //     <p class="met-sales-countdown-time-separator"></p>

    //     <p class="met-sales-countdown-time-separator"></p>

    //     <p class="met-sales-countdown-time-separator"></p>

    function init(targetElementId, config) {
        console.log(targetElementId,  config)
        let { startTime, endTime, untill, timeLabel } = config;
        let tillWhen = untill;
        let targetStartDate = new Date(startTime);
        let targetEndDate = new Date(endTime);
        labels = timeLabel;
        let targetElement = document.querySelector(targetElementId);
        if (!targetElement) {
            console.error("Target element not found.");
            return;
        }

        let currentDate = new Date(Date.now());

        if(currentDate >= targetStartDate && currentDate <= targetEndDate){
            updateCountdown(targetStartDate,targetEndDate, tillWhen, targetElement);
            setInterval(() => {
                updateCountdown(targetStartDate, targetEndDate, tillWhen, targetElement);

            }, 1000)
            // setInterval(updateCountdown, 1000);
        }
        
        
    }
    //    let p = getTimeRemaining(new Date('1 Jan, 2025'), 'tillMonth');

    return {
        init: init
    };
})();