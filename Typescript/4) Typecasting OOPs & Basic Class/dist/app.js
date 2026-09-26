"use strict";
/* TOPICS That we will cover in this
1 TYPE CASTING
2 OOPs
3 BASIC CLASS
*/
// 1 TYPE CASTING
// Jab hum HTML se kisi element ko TypeScript mein target karte hain, tab us element ki type initially pata nahi hoti. Isliye hum type casting karte hain (<HTMLButtonElement>) taaki hum TypeScript ko bata sakein ki wo element kis type ka hai, jaise ki button ya input.
let btn = document.querySelector("button");
// 2 OOPs (Object-Oriented Programming) ka basic purpose hota hai jo real-life objects ko represent karna aur unke characteristics aur behavior ko programming mein use karta hain. Har object ko properties (ya attributes) aur uske actions (ya methods) ke saath define kiya jaata hai.
// 3 CLASSES objects ko create karne ka blueprint ya template provide karte hain. Har class, ek particular type ke objects ke liye properties (ya attributes) aur behavior (ya methods) ko define karti hai. jiska use karke hum objects ko create kar sakte hain in short ye DAI ki tarah working karti hain
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
let student1 = new Student("Ali Huzaifa", 12);
//# sourceMappingURL=app.js.map