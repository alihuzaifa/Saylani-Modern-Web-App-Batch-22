// var number = 10.000;
// console.log(Math.round(number));
// console.log(Math.ceil(number));
// console.log(Math.floor(number));


// -5.77 -4 -3 -2 -1 0 1234567

// console.log(Math.ceil(Math.random() * 6));


// var number = "10.282827686";
// console.log(parseFloat(number));
// console.log(parseInt(number));
// console.log(Number(number));


// console.log(parseFloat(true));
// console.log(Number(true));


// console.log(parseFloat("abc123"));
// console.log(Number("1234abc"));



// var number = 1200;
// console.log(number.toString());
// console.log(number.toFixed(5));




var counterEl = document.getElementById('count');
var minusBtn = document.getElementById('minus-btn');

var counter = 0;
counterEl.innerHTML = counter



function increment() {
    counter++;
    counterEl.innerHTML = counter
     minusBtn.style.visibility = "visible"
}


function decrement() {
    if (counter > 0) {
        counter--;
        counterEl.innerHTML = counter
    }

    if (counter === 0) {
        minusBtn.style.visibility = "hidden"
    }
}


// 1 === > 0