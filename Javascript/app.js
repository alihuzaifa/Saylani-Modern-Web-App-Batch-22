var output = document.getElementById('output');

var firstStatment = '';
var operator = ''
var lastStatment = '';

function calculator(parameter) {
    // Operators Logic Handling
    if (parameter === "+") {
        operator = parameter
    } else if (parameter === "-") {
        operator = parameter
    } else if (parameter === "x") {
        operator = parameter
    } else if (parameter === "/") {
        operator = parameter
    } else if (parameter === "%") {
        operator = parameter
    }

    // Numbers Logic Handling
    else {
        if (operator === "") {
            firstStatment += parameter
        } else {
            lastStatment += parameter
        }
    }

    output.innerHTML += parameter;
}


function finalOutput() {
    if (operator === "") {
        output.innerHTML = "Error"
    } else if (firstStatment === "" || lastStatment === "") {
        output.innerHTML = "Error"
    } else if (operator === "+") {
        var final = Number(firstStatment) + Number(lastStatment);
        output.innerHTML = final
    }
}



// var userName = document.getElementById('userName');

// function submit() {
//     console.log(userName.value);
// }

// function reset() {
//     userName.value = ''
// }

// function defaultName() {
//     userName.value = "Ali Huzaifa"
// }






