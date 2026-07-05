// var statement = "A quick brown fox jumps over the lazy dog";
// console.log(statement.toLowerCase());
// console.log(statement.toUpperCase());



// var fruits = ["apple", "banana", "mango"];
// var userFruit = prompt("Enter a fruit name");
// var isFound = false;

// for (var i = 0; i < fruits.length; i++) {
//     var iteration = fruits[i];
//     if (iteration === userFruit.toLowerCase()) {
//         isFound = true;
//         break;
//     }

// }


// if (isFound) {
//     console.log("It's available");
// } else {
//     console.log("It's not available");
// }





// var text = "Lorem ipsum dolar";
// // var copyText = text.slice(0, 10);
// // console.log(copyText);

// var isSpaceFound = false;

// for (var i = 0; i < text.length; i++) {
//     var statement = text.slice(i, i + 2);
//     if (statement === "  ") {
//         isSpaceFound = true;
//         break;
//     }
// }

// if (isSpaceFound === true) {
//     console.log("Double Space Found");
// } else {
//     console.log("Double Space Not Found");
// }

// 0 6 (Lorem )
// var text = "Lorem Second Second Second dolar Second sjgsjg Second";
// var text = "Lorem ipsum 2nd dolar";

// console.log(text.slice(i, i + 6));
//  condition === Second{
//     text = startText + "2nd" + lastText
//  }

// for (var i = 0; i < text.length; i++) {
//     var statement = text.slice(i, i + 6);

//     var previousText = text.slice(0, i); // 40
//     if (statement === "Second") {
//         var nextText = text.slice(i + 6) // 6 + 6
//         text = previousText + "2nd" + nextText;
//     }
// }

// console.log(text);


// var text = "Lorem ipsum sit Second dolar dolar dolar dolar dolar";
// var previousText = text.slice(0, 16);
// var nextText = text.slice(16 + 6);
// var finalStatement = previousText + "2nd" + nextText
// console.log(finalStatement);



// var text = "Lorem Second Second Second dolar Second sjgsjg Second";
// // console.log(text.replace(/Second/g, "2nd"));
// console.log(text.indexOf("Second"));
// console.log(text.lastIndexOf("Second"));




var randomNumber = Math.random();
// 
var convertIntoInteger = Math.ceil(randomNumber * 3)
console.log(convertIntoInteger, randomNumber * 3);


