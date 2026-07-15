// var currentDate = new Date();
// // var convertDateIntoString = currentDate.toString()
// console.log(currentDate.getDay());
// console.log(currentDate.getMonth());
// console.log(currentDate.getDate());
// console.log(currentDate.getFullYear());
// console.log(currentDate.getHours());
// console.log(currentDate.getMinutes());
// console.log(currentDate.getSeconds());
// console.log(currentDate.getMilliseconds());


// var userDayNumber = +prompt("Enter a day number between 0 to 6?");
// // var currentDate = new Date()
// var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


// if (userDayNumber < 0 || userDayNumber > 6) {
//     console.error('Please enter a valid day number');
// } else {
//     console.log(days[userDayNumber]);
// }



// var currentDate = new Date();
// // Milliseconds => Seconds => Minutes => Hours => Day => Year
// var convertIntoYear = currentDate.getTime() / 1000 / 60 / 60 / 24 / 365;
// console.log(Math.round(convertIntoYear));


// var doomsday = new Date("June 30, 2035").getTime();
// var today = new Date().getTime();

// var milliSecondsDiff = doomsday - today;
// var convertIntoDay = milliSecondsDiff / 1000 / 60 / 60 / 24;

// console.log(convertIntoDay);

// var d = new Date("July 21, 1983 13:25:00");


// var birthday = new Date("August 30, 2002").getTime();
// var today = new Date().getTime();

// var milliSecondsDiff = today - birthday;
// var convertIntoDay = milliSecondsDiff / 1000 / 60 / 60 / 24;

// console.log(convertIntoDay);


// for (var i = 0; i < 10000; i++) {
//     console.log(i);
// }


// function greet() {
//     console.log("Hello");
// }

// setInterval(greet, 2000)




// var currentDate = new Date();
// console.log(typeof currentDate);
// console.log(String(currentDate).getDay());
// console.log(currentDate.getDay());
// console.log(currentDate.getMonth());
// console.log(currentDate.getDate());
// console.log(currentDate.getFullYear());
// console.log(currentDate.getHours());
// console.log(currentDate.getMinutes());
// console.log(currentDate.getSeconds());
// console.log(currentDate.getMilliseconds());
// console.log(currentDate.getTime());


// Get Methods 
// Set Methods 



// for (var i = 0; i < 10000; i++) {
//     console.log(i);
// }


var count = 1;

var loopId = setInterval(greet, 60000)

function greet() {
    console.log(count);
    count++;

    if (count > 10) {
        clearInterval(loopId)
    }
    // for (var i = 0; i < 500; i++) {
    // }
    // console.log('Hello World');
}
