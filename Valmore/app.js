
var dates = [];
var events = [];
var datesIds = [];
var datafromday = [];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//this function will put all the events on the calendar
//representing them with  a dot
function findEventsOfMonth(month, year) {
  const matchYears = [];
  let matchDates = [];
  dates.forEach((element) => {
    if (element.slice(0, 4) == year) {
      matchYears.push(element);
    }
  });
  matchYears.forEach((element) => {
    if (element.slice(5, 7) == month) {
      matchDates.push(element);
    }
  });

  matchDates = matchDates.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });

  if (matchDates.length > 0) {
    matchDates.forEach((element) => {
      let day = element.slice(8, 10);

      if (day < 10) {
        day = day[1];
      }
      const EvDay = document.querySelector(`[data-num="${day}"] .dateNumber`);

      EvDay.insertAdjacentHTML("afterend", '<span class="dot"></span>');
    });
  }
}

/////////////      Calendar Logic
////////////////////////////////////////////////////
////////////////////////////////////////////////////

function CalendarControl() {
  const calendar = new Date();

  const calendarControl = {
    localDate: new Date(),
    prevMonthLastDate: null,
    calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    calMonthName: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    daysInMonth: function (month, year) {
      return new Date(year, month, 0).getDate();
    },
    firstDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    },
    lastDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    },
    firstDayNumber: function () {
      return calendarControl.firstDay().getDay() + 1;
    },
    lastDayNumber: function () {
      return calendarControl.lastDay().getDay() + 1;
    },
    getPreviousMonthLastDate: function () {
      let lastDate = new Date(
        calendar.getFullYear(),
        calendar.getMonth(),
        0
      ).getDate();
      return lastDate;
    },
    navigateToPreviousMonth: function () {
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToNextMonth: function () {
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToCurrentMonth: function () {
      let currentMonth = calendarControl.localDate.getMonth();
      let currentYear = calendarControl.localDate.getFullYear();
      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl.attachEventsOnNextPrev();
    },
    displayYear: function () {
      let yearLabel = document.querySelector(".calendar .calendar-year-label");
      yearLabel.innerHTML = calendar.getFullYear();
    },
    displayMonth: function () {
      let monthLabel = document.querySelector(
        ".calendar .calendar-month-label"
      );
      monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
    },
    selectDate: function (e) {
      $("#join-box-show").show();
      $("#date").text(
        `${e.target.textContent} ${
          calendarControl.calMonthName[calendar.getMonth()]
        } ${calendar.getFullYear()}`
      );
      FindEventsOfDay(
        `${e.target.textContent} ${
          calendarControl.calMonthName[calendar.getMonth()]
        } ${calendar.getFullYear()}`
      );

      $(".event-body").html("");
      
    },
    plotSelectors: function () {
      document.querySelector(
        ".calendar"
      ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
          <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
          <div class="calendar-year-month">
          <div class="calendar-month-label"></div>
          <div>-</div>
          <div class="calendar-year-label"></div>
          </div>
          <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
          </div>
          <div class="calendar-today-date">Today: 
            ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
            ${calendarControl.localDate.getDate()}, 
            ${
              calendarControl.calMonthName[calendarControl.localDate.getMonth()]
            } 
            ${calendarControl.localDate.getFullYear()}
          </div>
          <div class="calendar-body"></div></div>`;
    },
    plotDayNames: function () {
      for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
      }
    },
    plotDates: function () {
      document.querySelector(".calendar .calendar-body").innerHTML = "";
      calendarControl.plotDayNames();
      calendarControl.displayMonth();
      calendarControl.displayYear();
      let count = 1;
      let prevDateCount = 0;

      calendarControl.prevMonthLastDate =
        calendarControl.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl.daysInMonth(
        calendar.getMonth() + 1,
        calendar.getFullYear()
      );
      // dates of current month
      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl.firstDayNumber()) {
          prevDateCount += 1;
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="prev-dates"></div>`;
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
      }
      //remaining dates after month dates
      for (let j = 0; j < prevDateCount + 1; j++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
      }
      calendarControl.highlightToday();
      calendarControl.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl.plotNextMonthDates();
    },
    attachEvents: function () {
      let prevBtn = document.querySelector(".calendar .calendar-prev a");
      let nextBtn = document.querySelector(".calendar .calendar-next a");
      let todayDate = document.querySelector(".calendar .calendar-today-date");
      let dateNumber = document.querySelectorAll(".calendar .dateNumber");
      prevBtn.addEventListener(
        "click",
        calendarControl.navigateToPreviousMonth
      );
      nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
      todayDate.addEventListener(
        "click",
        calendarControl.navigateToCurrentMonth,
        findEventsOfMonth(calendar.getMonth() + 1, calendar.getFullYear())
      );
      for (var i = 0; i < dateNumber.length; i++) {
        dateNumber[i].addEventListener(
          "click",
          calendarControl.selectDate,
          false
        );
      }
    },
    highlightToday: function () {
      let currentMonth = calendarControl.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll(".number-item")
      ) {
        document
          .querySelectorAll(".number-item")
          [calendar.getDate() - 1].classList.add("calendar-today");
      }
    },
    plotPrevMonthDates: function (dates) {
      dates.reverse();
      for (let i = 0; i < dates.length; i++) {
        if (document.querySelectorAll(".prev-dates")) {
          document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
        }
      }
    },
    plotNextMonthDates: function () {
      let childElemCount =
        document.querySelector(".calendar-body").childElementCount;
      //7 lines
      if (childElemCount > 42) {
        let diff = 49 - childElemCount;
        calendarControl.loopThroughNextDays(diff);
      }

      //6 lines
      if (childElemCount > 35 && childElemCount <= 42) {
        let diff = 42 - childElemCount;
        calendarControl.loopThroughNextDays(42 - childElemCount);
      }
    },
    loopThroughNextDays: function (count) {
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          document.querySelector(
            ".calendar-body"
          ).innerHTML += `<div class="next-dates">${i}</div>`;
        }
      }
    },
    attachEventsOnNextPrev: function () {
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
    init: function () {
      calendarControl.plotSelectors();
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
  };
  calendarControl.init();
}

const calendarControl = new CalendarControl();





//this IIFE (Immediately Invoked Function Expression)
// fetches all data from API and calls the  findEventsOfMonth()
(function () {
  var settings = {
    url: "https://api.corvium.com/api/1.0.0/test/events/62d2818ebe594138ed60bfed/list",
    method: "POST",
    timeout: 0,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ limit: 100, sort: "created_at" }),
  };

  $.ajax(settings).done(function (response) {
    data = response.return.docs;

    const getDates = function (evnts) {
      evnts.forEach((evnt) => {
        dates.push(evnt.event_date.split("T")[0]);

        datesIds.push(evnt.event_date.split("T")[0] + "+" + evnt._id);
      });
      evnts.forEach((evnt) => {
        events.push(evnt);
      });
    };

    getDates(data);

    const fm = $(".calendar-month-label").text();
    const firstyear = $(".calendar-year-label").text();
    const firstmonth = months.indexOf(fm) + 1;

    findEventsOfMonth(firstmonth, firstyear);
  });
})();





//                         DOCUMENTS
////////////////////////////////////////////////////
////////////////////////////////////////////////////

//close  the pop up window
$(document).on("click", ".cancel", () => {
  $("#join-box-show").hide();
});


//ADD EVENT 
$(document).on("click", ".add-event-head", () => {

  $(".add-event-body").html("");
  $(".add-event-body").addClass("bg-secondary mt-3 mb-3");
  $(".add-event-body").append(
    ' <label for="eventDate">Event name:</label>      <input type="text" class="eventName"  style="width: 350px;margin-left: 15px;" id="usr">      <label for="description" class="mt-3">Event description:</label>      <input type="text" class="CreateDescription mb-2 "  style="width: 350px;margin-left: 105px;" id="usr"><label for="time" style="margin-right: 62px;">Time:</label> <input type="time" id="appt" class="timeEvent"  required><button type="button"  class="saveNew btn btn-primary " style=" margin: 5px 80px 5px 205px;">Save!'
  );

  //one() will prevent creating more than one events if user presses the button two times
  $(document).one("click", ".saveNew", (e) => {
    const event_name = $(".eventName").val();
    const Create_description = $(".CreateDescription").val();
    const time = $(".timeEvent").val();
    let date = $("#date").text();
    date = FixDate(date);
    date = date + " " + time + ":00";
    let newEvent = {};

    if (time && event_name && Create_description) {
      newEvent.event_name = event_name;
      newEvent.event_description = Create_description;
      newEvent.event_date = date;

      CreateNewEvent(newEvent);
    } else {
      alert("In order to create an event all inputs must be filled");
    }
  });


  //if user press anywhere but the div - hide the div
  var AddContainer = document.querySelector(".add-event");
  document.addEventListener("click", function (event) {    
    try {
      if (
        AddContainer !== event.target &&
        !AddContainer.contains(event.target)
      ) {
        $(".add-event-body").hide();
        //AddContainer = "";
      } else {
        $(".add-event-body").show();
      }
    } catch (error) {}
  });
});


//SEE ALL EVENTS OF ONE DAY
$(document).on("click", ".event-head", (e) => {
 
  $(".event-body").html("");
  for (let i = 0; i < datafromday.length; i++) {
    const y = datafromday[i];
    
    $(".event-body").append(
      '<div class="event bg-light text-dark mx-auto mt-2 mb-2" style="width: 380px;" id ="d_' +
        y.return._id +
        '"> <h6 id ="' +
        y.return._id +
        '">' +
        y.return.event_name +
        '</h6><div class="event-info" id="i_' +
        y.return._id +
        '"></div></div>'
    );
  }

  var EventContainer = document.querySelector(".day-event");
  document.addEventListener("click", function (event) {
    try {
      if (
        EventContainer !== event.target &&
        !EventContainer.contains(event.target)
      ) {
        $(".event-body").hide();
        document.removeEventListener("click");
      } else {
        $(".event-body").show();
      }
    } catch (error) {}
  });
});


//SEE ONE EVENT
$(document).on("click", ".event ", (e) => {
  let dayevent;

  //the active class is the one the user pressed on
  if (!$("#d_" + e.target.id).hasClass("active")) {

        //CHECK IF THERE IS AN ACTIVE CLASS TO MAKE IT IN-ACTIVE
        const element = document.querySelector(".active");        
        if (element) {
          element.classList.remove("active");
          element.children[1].style.display = "none";         
        }

        //ADD CLASS TO THE TARGET ELEMENT
        $("#d_" + e.target.id).addClass("active");
       
        
        const elementHasChild=document.getElementById("i_" + e.target.id)
        if(elementHasChild.hasChildNodes()){
          //IF THE ELEMENT HAD BEEN SELECTED BEFORE JUST SHOW IT
          $("#i_" + e.target.id).show();
        }else{    
                
          datafromday.forEach((element) => {
            if (element.return._id == e.target.id) {
              const eventName = $("#d_" + e.target.id + " h6").text();
              $("#d_" + e.target.id).addClass("bg-secondary");
  
              $("#i_" + e.target.id).append(
                '<label for="EventName">Event Name:</label>      <input type="text" class="EventName"  style="width: 350px;margin-left: 15px;" id="usr">  <label for="eventDate">Event date:</label>      <input type="text" class="eventDate"  style="width: 350px;margin-left: 15px;" id="usr">           <label for="description">Event description:</label>      <input type="text" class="description mb-2"  style="width: 350px;margin-left: 15px;" id="usr"><button type="button" id="sav_' +
                  e.target.id +
                  '" class="save btn btn-primary " style=" margin: 5px 80px 5px 100px;">Save!</button><button type="button" id="del_' +
                  e.target.id +
                  '"  class="delete btn btn-danger">Delete!</button>'
              );
              $(".EventName").val(eventName);
              $(".eventDate").val(element.return.event_date.split("T").join("  "));
  
              $(".description").val(element.return.event_description);
  
              //SAVE CHANGES BUTTON
              let UpdateEvent = {};
              $(document).on("click", "#sav_" + e.target.id + "", (e) => {
                UpdateEvent.event_name = $(".EventName").val();
                UpdateEvent.event_description = $(".description").val();
                UpdateEvent.event_date = $(".eventDate").val();
                const updateId = e.target.id.split("_")[1];
                UpdateEvents(updateId, UpdateEvent);
              });
  
              //DELETE BUTTON
              $(document).on("click", "#del_" + e.target.id + "", (e) => {
                const x = e.target.id.split("_")[1];
                DeleteEvent(x);
                $("#d_" + e.target.id + "").css("display", "none");
              });
            }
          });
        }

       
  } else {
    $("#i_" + e.target.id).show();
  }

});





//HELPER FUNCTIONS
////////////////////////////////////////////////////
////////////////////////////////////////////////////
function FindEventsOfDay(dt) {
  datafromday = [];
  let helperfordataDay = [];

  const newday = FixDate(dt);
  if (datafromday.length === 0) {
    let arrayhelp = [];
    datesIds.forEach((element) => {
      if (element.split("+")[0] == newday) {        
        const x = GetAnEvents(element.split("+")[1]);
        datafromday = x;       
      }
    });    
  }
}

function FixDate(dt) {
  const makeday = dt.split(" ");
  makeday[1] = months.indexOf(makeday[1]) + 1;
  makeday.reverse();
  const month = "0" + makeday[1];
  const day = "0" + makeday[2];
  const fixedDate = makeday[0] + "-" + month.slice(-2) + "-" + day.slice(-2);
  return fixedDate;
}





//API CALLS
////////////////////////////////////////////////////
////////////////////////////////////////////////////
function ListOfEvents() {
  var response;
  var settings = {
    url: "https://api.corvium.com/api/1.0.0/test/events/62d2818ebe594138ed60bfed/list",
    method: "POST",
    timeout: 0,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ limit: 100, sort: "created_at" }),
  };

  $.ajax(settings).done(function (data) {
    response = data;
    //console.log(response);
  });
  return response;
}

function GetAnEvents(id) {
  var settings = {
    url: `https://api.corvium.com/api/1.0.0/test/events/62d2818ebe594138ed60bfed/${id}`,
    method: "GET",
    timeout: 0,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
    },
  };

  $.ajax(settings).done(function (response) {
    // if (datafromday) {
    //   datafromday.push(response);
    // } else {
    //   datafromday = response;
    // }
    datafromday.push(response);
  });

  return datafromday;
}

function CreateNewEvent(event) {
  var settings = {
    url: "https://api.corvium.com/api/1.0.0/test/events/62d2818ebe594138ed60bfed/new",
    method: "POST",
    timeout: 0,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      event_name: event.event_name,
      event_description: event.event_description,
      event_date: event.event_date,
    }),
  };
  $.ajax(settings).done(function (response) {
    //console.log(response);
    window.location.reload();
  });
}

function UpdateEvents(id, update) {
  var settings = {
    url: `https://api.corvium.com/api/1.0.0/test/events/62d2818ebe594138ed60bfed/${id}`,
    method: "PUT",
    timeout: 0,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      event_name: update.event_name,
      event_description: update.event_description,
      event_date: update.event_date,
    }),
  };

  $.ajax(settings).done(function (response) {
    //console.log(response);
    window.location.reload();
  });
}

function DeleteEvent(id) {
  var settings = {
    url: `https://api.corvium.com/api/1.0.0/test/events/62d2818ebe594138ed60bfed/${id}`,
    method: "DELETE",
    timeout: 0,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
    },
  };
  $.ajax(settings).done(function (response) {
    //console.log(response);
    window.location.reload();
  });
}
