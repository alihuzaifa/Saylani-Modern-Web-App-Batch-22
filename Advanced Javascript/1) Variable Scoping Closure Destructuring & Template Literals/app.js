// ========================= 1) VARIABLE SCOPING =========================

// var
// let
// const


// var is hoisted -> undefined milta hai, error nahi

// console.log(userName);

// var userName = "Ali";
// console.log(userName);


// let lexical scope (block scope)

// if (true) {
//     let myName = "Ali";
//     let myName = "Huzaifa";
//     console.log(myName);
// }

// console.log(myName);


// const ki value dobara assign nahi ho sakti

// const PI_VALUE = 3.14;
// PI_VALUE = 4.4;
// console.log(PI_VALUE);




// ========================= 2) CLOSURE =========================

// child function apne parent ke variable ko yaad rakhta hai

// function parent() {
//     let parentCount = 0;

//     function child() {
//         parentCount++
//         console.log(parentCount);
//     }

//     return child

// }


// let checkCount = parent();
// checkCount()
// checkCount()
// checkCount()
// checkCount()




// ========================= 3) DESTRUCTURING =========================

// Object destructuring

// let user = {
//     name: "Ali",
//     age: 10
// }

// let { name, age } = user;

// console.log(name);
// console.log(age);


// Array destructuring

// let fruits = ['Apple', "Peach", "Pineapple"]
// let [fruit1, fruit2, fruit3] = fruits
// console.log(fruit1);
// console.log(fruit2);
// console.log(fruit3);




// ========================= 4) ARROW FUNCTION & TEMPLATE LITERALS =========================

// normal function

// function greet() {
//     return "Hello"
// }


// arrow function (short return)

// const greetUser = () => "Hello"
// const greetMessage = greetUser()
// console.log(greetMessage);


// template literal -> backtick ` ` ke andar ${} se value lagti hai

// const greet = userName => `Hello ${userName}`
// const message = greet('Saad');
// console.log(message);
