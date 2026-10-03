"use strict";
/* TOPICS That we will cover in this
1 TYPE (type alias)
2 INTERFACE
3 INTERFACE WITH CLASSES (implements, inheritance, access modifiers)
4 TYPE vs INTERFACE (same name ka difference)
5 UNION TYPES (do ya zyada data types mein se koi aik)
6 INTERSECTION TYPES (do ya zyada types ko jor kar aik banana)
*/
const user1 = { name: "Ali Huzaifa", age: 22 };
const user2 = { name: "Huzaifa", age: 20, email: "huzaifa@example.com" };
const studentId = 101;
const product1 = { id: 1, title: "Laptop", price: 150000 };
// a) implements: Teacher class ne Person interface ko implement kiya, ab is mein name aur greet() hona zaroori hai
class Teacher {
    // access modifiers yahan bhi chalte hain: public bahar se access hoga, private sirf class ke andar
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    greet() {
        return `Assalam o Alaikum, I am ${this.name}`;
    }
}
const teacher1 = new Teacher("Sir Ali", 50000);
console.log(teacher1.greet());
const employee1 = {
    name: "Bilal",
    employeeId: 7,
    greet() {
        return "Hello";
    },
};
const manager1 = {
    name: "Ahmed",
    city: "Karachi",
    teamSize: 5,
    greet() {
        return "Hi team";
    },
};
// ab Car mein brand aur model dono hain
const car1 = { brand: "Toyota", model: "Corolla" };
const dog1 = { name: "Tommy", breed: "German Shepherd" };
const dog2 = { name: "Moti", breed: "Labrador" };
// interface Status = "pending" | "paid"; // Ye galat hai, interface sirf object ki shape batata hai
// Conclusion: Object ka structure ya class ke liye contract chahiye to interface acha hai. Union, intersection ya kisi simple type ko naam dena ho to type use karo
// 5 UNION TYPES: union se hum batate hain ke variable mein do ya zyada data types mein se koi bhi aik aa sakta hai. | (pipe) laga kar likhte hain
let value;
value = 10; // Valid
value = "Hello"; // Valid
// value = true; // Error: boolean allowed nahi
// union ke saath kaam karte waqt pehle check karo ke abhi value kis type ki hai, phir us type ka method use karo
function printId(id) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    }
    else {
        console.log(id.toFixed(2));
    }
}
printId("abc");
printId(25);
// union mein fixed values bhi de sakte hain, sirf yahi values allowed hongi
let orderStatus = "pending";
orderStatus = "paid";
// orderStatus = "shipped"; // Error: "shipped" Status mein nahi hai
// array mein bhi union: is array mein string aur number dono aa sakte hain
const mixed = ["Ali", 22, "Karachi", 5];
const studentInfo = {
    name: "Ali",
    age: 22,
    phone: "03001234567",
};
// agar koi aik property bhi chhor di to error aayega, kyunke teeno types ki properties zaroori hain
console.log(user1, user2, studentId, product1, employee1, manager1, car1, dog1, dog2, value, orderStatus, mixed, studentInfo);
//# sourceMappingURL=app.js.map