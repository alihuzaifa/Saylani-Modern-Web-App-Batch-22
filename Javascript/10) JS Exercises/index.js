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


// function greaterNumberChecker(number1, number2, number3) {
//     if (number1 > number2 && number1 > number3) {
//         return number1 + " is the largest number"
//     } else if (number2 > number1 && number2 > number3) {
//         return number2 + " is the largest number"
//     } else if (number3 > number1 && number3 > number2) {
//         return number3 + " is the largest number"
//     } else {
//         return number1 + " is the largest number"
//     }
// }


// var findLargest = greaterNumberChecker(-5, 5, 5);
// console.log(findLargest);



// function combineName(firstName, lastName) {
//     return "Hello " + firstName + " " + lastName;
// }

// var userName = combineName('Ali', 'Huzaifa');
// console.log(userName);


// function eligibility(age, vipPass) {
//     if (age >= 19 || vipPass === "Yes") {
//         alert("You are eligible for the admission")
//     } else if (age < 19) {
//         alert("You are not eligible for the admission")
//     }
// }

// eligibility(25, "No")

// var user1 = "Aslam"
// var user2 = "Sadiq"
// var user3 = "Ahmed"
// console.log(user3);


// var users = ["Aslam", "Sadiq", "Ahmed", "Bilal"];
// console.log(users[2]);



// var users = ["Ali", "Aslam", "Sadiq", "Ahmed"];
// // users.push("Ali", "Sadiq", "Ahmed");
// // // users.push("Sadiq");
// // // users.push("Ahmed");
// // console.log(users);



// // var test = users.pop();
// // console.log(test);





// users.unshift("Ali", "Sadiq", "Ahmed")
// // users.unshift("Ali2", "Sadiq2", "Ahmed2")


// // users.shift()
// // users.shift()

// console.log(users.length);









// 2 Record Asghar
var users = ["Ali", "Aslam", "Sadiq", "Ahmed"];


// users.splice(1, 2)
// users.splice(1)



// users.splice(1, 0, "Mujeeb", "Rehman")

users.splice(1, 1, "Asghar")
console.log(users);

