/* TOPICS That we will cover in this
1 TYPE (type alias)
2 INTERFACE
3 INTERFACE WITH CLASSES (implements, inheritance, access modifiers)
4 TYPE vs INTERFACE (same name ka difference)
5 UNION TYPES (do ya zyada data types mein se koi aik)
6 INTERSECTION TYPES (do ya zyada types ko jor kar aik banana)
*/


// 1 TYPE: type keyword se hum apni marzi ka naya type bana sakte hain aur usko naam de dete hain. Phir har jagah wohi naam use karte hain, baar baar poora structure nahi likhna padta
type User = {
  name: string;
  age: number;
  email?: string; // ? ka matlab ye property optional hai, na bhi ho to error nahi aayega
};

const user1: User = { name: "Ali Huzaifa", age: 22 };
const user2: User = { name: "Huzaifa", age: 20, email: "huzaifa@example.com" };

// type sirf object ke liye nahi, kisi bhi data type ko naam de sakta hai
type ID = number;
const studentId: ID = 101;


// 2 INTERFACE: interface bhi object ka structure (shape) batata hai, yani object mein kaun kaun si properties hongi aur unka type kya hoga. Kaam bilkul type jaisa hai
interface Product {
  title: string;
  price: number;
  readonly id: number; // readonly ka matlab aik dafa value de di to baad mein change nahi hogi
}

const product1: Product = { id: 1, title: "Laptop", price: 150000 };
// product1.id = 2; // Error: id readonly hai


// 3 INTERFACE WITH CLASSES: interface ko class par implements kar sakte hain. Is ka matlab class ko wo saari properties aur methods banane hi padenge jo interface mein likhe hain, warna error aayega

interface Person {
  name: string;
  greet(): string;
}

// a) implements: Teacher class ne Person interface ko implement kiya, ab is mein name aur greet() hona zaroori hai
class Teacher implements Person {
  // access modifiers yahan bhi chalte hain: public bahar se access hoga, private sirf class ke andar
  constructor(public name: string, private salary: number) {}

  greet(): string {
    return `Assalam o Alaikum, I am ${this.name}`;
  }
}

const teacher1 = new Teacher("Sir Ali", 50000);
console.log(teacher1.greet());
// console.log(teacher1.salary); // Error: salary private hai

// b) Interface INHERITANCE: aik interface dusre interface ko extends kar sakta hai, us ki saari properties le leta hai aur apni nayi bhi add kar sakta hai
interface Employee extends Person {
  employeeId: number;
}

const employee1: Employee = {
  name: "Bilal",
  employeeId: 7,
  greet() {
    return "Hello";
  },
};

// c) Aik interface aik se zyada interfaces ko bhi extends kar sakta hai, comma laga kar
interface HasAddress {
  city: string;
}

interface Manager extends Person, HasAddress {
  teamSize: number;
}

const manager1: Manager = {
  name: "Ahmed",
  city: "Karachi",
  teamSize: 5,
  greet() {
    return "Hi team";
  },
};


// 4 TYPE vs INTERFACE: dono se object ka structure bana sakte hain aur zyada tar jagah koi bhi use kar lo. Magar kuch farq hain

// a) Same name (Declaration Merging): agar same naam se do interface bana do to TypeScript dono ko jor kar (merge karke) aik bana deta hai
interface Car {
  brand: string;
}

interface Car {
  model: string;
}

// ab Car mein brand aur model dono hain
const car1: Car = { brand: "Toyota", model: "Corolla" };

// Lekin same naam se do type banao to error aata hai: Duplicate identifier
type Bike = {
  brand: string;
};

// type Bike = {
//   model: string;
// }; // Error: Duplicate identifier 'Bike'

// b) Extend karne ka tareeqa: interface mein extends likhte hain, type mein & (intersection) lagate hain
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

type AnimalType = { name: string };
type DogType = AnimalType & { breed: string };

const dog1: Dog = { name: "Tommy", breed: "German Shepherd" };
const dog2: DogType = { name: "Moti", breed: "Labrador" };

// c) Union aur simple data types ka naam sirf type se bana sakte hain, interface se nahi
type Status = "pending" | "paid" | "cancelled";
// interface Status = "pending" | "paid"; // Ye galat hai, interface sirf object ki shape batata hai

// Conclusion: Object ka structure ya class ke liye contract chahiye to interface acha hai. Union, intersection ya kisi simple type ko naam dena ho to type use karo


// 5 UNION TYPES: union se hum batate hain ke variable mein do ya zyada data types mein se koi bhi aik aa sakta hai. | (pipe) laga kar likhte hain
let value: string | number;

value = 10; // Valid
value = "Hello"; // Valid
// value = true; // Error: boolean allowed nahi

// union ke saath kaam karte waqt pehle check karo ke abhi value kis type ki hai, phir us type ka method use karo
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
printId("abc");
printId(25);

// union mein fixed values bhi de sakte hain, sirf yahi values allowed hongi
let orderStatus: Status = "pending";
orderStatus = "paid";
// orderStatus = "shipped"; // Error: "shipped" Status mein nahi hai

// array mein bhi union: is array mein string aur number dono aa sakte hain
const mixed: (string | number)[] = ["Ali", 22, "Karachi", 5];


// 6 INTERSECTION TYPES: intersection se do ya zyada types ko jor kar aik naya type banta hai jis mein sab ki properties hoti hain. & laga kar likhte hain
// Union ka matlab "ya to ye ya wo", intersection ka matlab "ye bhi aur wo bhi"
type Name = { name: string };
type Age = { age: number };
type Contact = { phone: string };

type StudentInfo = Name & Age & Contact;

const studentInfo: StudentInfo = {
  name: "Ali",
  age: 22,
  phone: "03001234567",
};
// agar koi aik property bhi chhor di to error aayega, kyunke teeno types ki properties zaroori hain

console.log(user1, user2, studentId, product1, employee1, manager1, car1, dog1, dog2, value, orderStatus, mixed, studentInfo);
