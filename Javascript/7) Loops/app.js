// Initialization Condition Updation
// for (var i = 1; i <= 10; i++) {
//     console.log(i);
// }



// for (var i = 10; i >= 1; i--) {
//     console.log(i);
// }






// var tableNo = +prompt("Enter a table Number", 0)
// var tableCount = +prompt("Enter a table count", 0)

// for (var i = 1; i <= tableCount; i++) {
//     var tableStatment = tableNo + " x " + i + " = " + i * tableNo;
//     console.log(tableStatment);
// }



// var cities = ['Karachi', "Lahore", "Peshawar", "Multan"];
// var userCity = prompt("Enter a city name?");
// var isFound = false;

// for (var i = 0; i < cities.length; i++) {
//     if (cities[i] === userCity) {
//         isFound = true;
//         break;
//     }

// }


// if (isFound === true) {
//     console.log("It's one of the cleanest city");
// } else {
//     console.log("It's not the cleanest city");
// }


// var numbers = [1, 23, 4, 5, 6, 77, 8, 999, 0];

// var largestNumber = 0;
// for (var i = 0; i < numbers.length; i++) {
//     var currentNumber = numbers[i];
//     // 1 > 0 true 
//     // largestNumber  = 1
//     if (currentNumber > largestNumber) {
//         largestNumber = currentNumber
//     }

// }


// console.log(largestNumber);











// var numbers = [1, -23, 4, -5, 6, 77, -8, 999, -10];
// var numbers = [20, 30, 40, 10, 4, 9, 7];

// var smallestNumber = numbers[0];

// for (var i = 0; i < numbers.length; i++) {
//     var currentNumber = numbers[i];

//     // 4 < 0
//     if (currentNumber < smallestNumber) {
//         smallestNumber = currentNumber
//     }
// }

// console.log(smallestNumber);



// var numbers = [2, 3, -2, 3, -1, 0, -6, 56, -49];
// var negativeNumberCount = 0

// for (var index = 0; index < numbers.length; index++) {

//     if (numbers[index] < 0) {
//         negativeNumberCount++
//     }

// }
// console.log(negativeNumberCount);


// var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// var total = 0;

// for (var i = 0; i < numbers.length; i++) {
//     // total = total + numbers[i]
//     total += numbers[i]
// }
// console.log(total);


// var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// var evenNumbers = []
// var oddNumbers = []

// for (var i = 0; i < numbers.length; i++) {
//     var iteration = numbers[i]
//     if (iteration % 2 === 0) {
//         evenNumbers.push(iteration)
//     } else {
//         oddNumbers.push(iteration)
//     }
// }

// console.log(evenNumbers);
// console.log(oddNumbers);


// var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// Second Largest Number


// Duplicate Number
// var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4];




// var numbers = [1, 2, 3, 4, 5, 29, 6, 7, 48, 9, 110];

// var largestNumber = numbers[0];
// var secondLargestNumber = numbers[0];

// // Largest Number
// for (var i = 0; i < numbers.length; i++) {
//     var iteration = numbers[i];
//     if (iteration > largestNumber) {
//         largestNumber = iteration
//     }
// }

// // Second Largest Number
// for (var i = 0; i < numbers.length; i++) {
//     var iteration = numbers[i];
//     if (iteration > secondLargestNumber && iteration < largestNumber) {
//         secondLargestNumber = iteration
//     }
// }

// console.log(secondLargestNumber);




// var firstNames = ["Muhammad", "Ali"];
// var lastNames = ["Hamza", "Atif", "Zaid", "Bilal"];


// for (var i = 0; i < 5; i++) {
//     for (var j = 0; j < 5; j++) {
//         console.log("Parent Loop", i, "Child Loop", j);

//     }
// }

// for (var i = 0; i < firstNames.length; i++) {
//     var prefix = firstNames[i]
//     for (var j = 0; j < lastNames.length; j++) {
//         var suffix = lastNames[j];
//         console.log(prefix, suffix);
//     }
// }


// 1 ===> 2 > 4
// 2 ===> 3 > 4
// 3 ===> 4 > 4
// var duplicateNumbers = []
// var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4];
// for (var i = 0; i < numbers.length; i++) {
//     var pIteration = numbers[i]
//     for (var j = i + 1; j < numbers.length; j++) {
//         var childIteration = numbers[j]
//         if (pIteration === childIteration) {
//             duplicateNumbers.push(childIteration)
//         }
//     }
// }

// console.log(duplicateNumbers);







var word = prompt("Enter a word?");
var reverseWord = ""

for (var i = word.length - 1; i >= 0; i--) {
    var iteration = word[i]
    // Mapping from letters to word
    reverseWord += iteration
}

if (word === reverseWord) {
    console.log("Palindrome Word");
} else {
    console.log("Not a Palindrome Word");
}
