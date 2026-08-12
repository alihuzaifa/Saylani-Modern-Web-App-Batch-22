// {
//     name:"Ali",
//     age:22,
//     subject:'Urdu'
// }

// var obj = {

// }



// console.log(this);

// var obj = {
//     name: 'Ali',
//     greet: function () {
//         console.log(this);
//     }
// }

// console.log(obj.greet());


// var obj = {
//     name: 'Ali'
// };


// obj.prototype.secret = "1234"

// console.log(obj);



// function Student(name, age, favSubject) {
//     this.name = name;  // Ali
//     this.age = age;
//     this.favouriteSubject = favSubject
// }

// Student.prototype.secret = '1234'



// var student1 = new Student("Ali", 22, 'Urdu');
// // console.log(Object.getPrototypeOf(student1));

// console.log(student1.hasOwnProperty('userName'));

var email = document.getElementById('email')
var password = document.getElementById('password')

var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function login() {
    if (emailRegex.test(email.value)) {
        alert("email is valid")
    } else {
        alert("Please provide a valid email")
    }

    if (password.value.length < 6) {
        alert("Please provide a strong password")
    } else {
        alert("password is valid")
    }
}