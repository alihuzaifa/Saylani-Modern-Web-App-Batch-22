"use strict";
/* TOPICS That we will cover in this
1 CLASSES
2 INHERITANCE IN CLASSES
3 ACCESS MODIFIERS (public , private , protected)
*/
// 1 CLASSES objects ko create karne ka blueprint ya template provide karte hain. Har class, ek particular type ke objects ke liye properties (ya attributes) aur behavior (ya methods) ko define karti hai. jiska use karke hum objects ko create kar sakte hain in short ye DAI ki tarah working karti hain
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
let student1 = new Student("Ali Huzaifa", 12);
// 2 INHERITANCE is like apne aik class banai hain jisme ap ne kuch properties aur methods define kiye huwe hain or ap chah rahe hain k mene aik aur class banai hain volunteer student magar usme Student wali class ki bhi properties ajaye mujhe dubara nahi likhna pade
class VolunteerStudent extends Student {
    constructor(name, age) {
        super(name, age);
        this.name = name;
        this.age = age;
    }
}
const volunteerStudent = new VolunteerStudent("Huzaifa", 12);
// 3 ACCESS MODIFIERS TypeScript mein class members (properties aur methods) ko control karte hain, yani ye batate hain ki class ke bahar se un members ko kis tarah access kiya ja sakta hai.
// a) Public Access Modifier: public access modifier ke saath members ko declare karne se, woh members class ke bahar bhi accessible ho jaate hain. Yani, unhe class ke instances se ya dusre classes se directly access kiya ja sakta hai.
class PublicCar {
    constructor(brand) {
        this.brand = brand;
    }
}
let myCar = new PublicCar("Toyota");
// b) Private Access Modifier: Jab koi member ko private declare kiya jaata hai, tab woh member sirf apne defining class ke andar hi accessible hota hai. Yani, dusre class ya instances se us private member ko direct access nahi kiya ja sakta hai. aur ap isko bahar se bhi access nahi karsakte
class PrivateCar {
    constructor() {
        this.speed = 50;
    }
}
const car = new PrivateCar();
//  c) Protected access modifier bhi access control ko define karta hai, lekin yeh thoda alag hota hai. Jab ek member ko protected declare kiya jaata hai, toh woh member apne defining class ke andar accessible hota hai, aur saath hi uski subclasses mein bhi accessible hota hai.
//  Iska matlab hai ki agar ek class mein Vehicle ke naam se ek class hai aur usme speed naam ka protected variable hai, toh speed variable ko Vehicle class ke instances ke saath saath uski subclasses bhi access kar sakti hain.
class ProtectedCar {
    constructor() {
        this.name = "";
    }
}
class Car extends ProtectedCar {
    constructor(carName, fuelInTakeName) {
        super();
        this.carName = carName;
        this.fuelInTakeName = fuelInTakeName;
    }
}
const protectedCar1 = new Car("Mercedes", "FuelName");
//# sourceMappingURL=app.js.map