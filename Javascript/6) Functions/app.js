// function greet() {
//     console.log("Hello ");
// }

// greet()
// greet()
// greet()
// greet()
// greet()
// greet()
// greet()
// greet()





// function sum(number1, number2) {
//     return number1 + number2;
// }
// sum(100, 200)
// sum(100, 2030)
// sum(100, 20120)


// console.log(number1 + number2);


// var total = sum(100, 20120)

// console.log("User Total ====>", total)


// function powerOfNumber(number) {
//     return number * number
// }

// var result = powerOfNumber(5);
// console.log(result);




// function calculator(number1, number2, operator) {
//     if (operator === "+") {
//         return number1 + number2;
//     } else if (operator === "-") {
//         return number1 - number2
//     } else if (operator === "*") {
//         return number1 * number2
//     } else if (operator === "/") {
//         return number1 / number2
//     } else {
//         var message = "Invalid Operator has been provided"
//         return message
//     }
// }


// var sum = calculator(10, 20, "+")
// var sub = calculator(10, 20, "-")
// var mul = calculator(10, 20, "*")
// var div = calculator(10, 20, "/")
// var invalidOperator = calculator(10, 20, "@");

// console.log(sum, sub, mul, div, invalidOperator);



// function gradeChecker(totalMarks) {
//     if (totalMarks >= 80) {
//         return "A+"
//     } else if (totalMarks >= 70) {
//         return "A"
//     } else if (totalMarks >= 60) {
//         return "B"
//     } else if (totalMarks >= 50) {
//         return "C"
//     } else if (totalMarks >= 33) {
//         return "D"
//     } else {
//         return "Legends"
//     }

// }


// var grade = gradeChecker(54);
// console.log(grade);


function greaterNumberChecker(number1, number2, number3) {
    if (number1 > number2 && number1 > number3) {
        return number1 + " is the largest number"
    } else if (number2 > number1 && number2 > number3) {
        return number2 + " is the largest number"
    } else if (number3 > number1 && number3 > number2) {
        return number3 + " is the largest number"
    } else {
        return number1 + " is the largest number"
    }

}


var findLargest = greaterNumberChecker(-5, 5, 5);
console.log(findLargest);
