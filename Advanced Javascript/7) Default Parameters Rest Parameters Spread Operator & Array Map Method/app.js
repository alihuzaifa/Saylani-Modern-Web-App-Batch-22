// ========================= 1) DEFAULT PARAMETERS =========================

// agar argument na bheja jaye to default value use hoti hai

// const sum = (num1 = 0, num2 = 0) => num1 + num2;

// const result = sum(100, 100);

// console.log(result);




// ========================= 2) REST PARAMETERS =========================

// ...numbers saare arguments ko ek array me jama kar deta hai

// const sum = (...numbers) => {
//   let total = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     const item = numbers[i];
//     total += item;
//   }
//   return total;
// };

// const result = sum(12, 32, 3, 456, 78, 534);

// console.log(result);




// ========================= 3) SPREAD OPERATOR =========================

// pehle loop ke saath aise karte the

// let array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let array2 = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1];

// let mergedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1];

// const combinedArray = [];

// for (let i = 0; i < array1.length; i++) {
//   const element = array1[i];
//   combinedArray.push(element)
// }

// for (let i = 0; i < array2.length; i++) {
//   const element = array2[i];
//   combinedArray.push(element)
// }

// console.log(combinedArray);


// spread ke saath ek line me ho jata hai -> {} aur [] dono par chalta hai

// let array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let array2 = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1];

// const mergedArray = [...array1, ...array2];
// console.log(mergedArray);

// const copyArray = [...array1];

// const updateArray = [-1, 0, ...array1, 11, 12, 13, 14, 15];
// console.log(updateArray);

// Copy
// Merge
// Update




// ========================= 4) OPTIONAL CHAINING =========================

// ?. lagane se null/undefined par error nahi aata, undefined milta hai

// const obj = {
//   name: "Ali",
//   degree: null,
// };
// console.log(obj?.degree?.name);




// ========================= 5) ARRAY MAP METHOD =========================

// map ===> Process + transform into new array
// filter
// reduce

// let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const result = numbers.map((item) => item * 10);

// const result = numbers.map((item) => {
//   return item * 10;
// });
// console.log(result);


// wahi kaam purane loop se

// const finalArray = [];
// for (let i = 0; i < numbers.length; i++) {
//   const element = numbers[i];
//   finalArray.push(element * 10);
// }
// console.log(finalArray);


// map + template literal

let names = ["Ali", "Asad", "Saad"];

const result = names.map(item => `Mr ${item}`);

console.log(result);
