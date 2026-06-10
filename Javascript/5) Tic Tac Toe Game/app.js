var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var box3 = document.getElementById("box3");
var box4 = document.getElementById("box4");
var box5 = document.getElementById("box5");
var box6 = document.getElementById("box6");
var box7 = document.getElementById("box7");
var box8 = document.getElementById("box8");
var box9 = document.getElementById("box9");

var text = "O";
var count = 1;

function game(input) {
  // Text Condition
  if (count % 2 === 0) {
    text = "X";
  } else {
    text = "O";
  }

  // Text rendering
  if (box1.innerHTML === "" && input === "box1") {
    box1.innerHTML = text;
  } else if (input === "box2") {
    box2.innerHTML = text;
  } else if (input === "box3") {
    box3.innerHTML = text;
  } else if (input === "box4") {
    box4.innerHTML = text;
  } else if (input === "box5") {
    box5.innerHTML = text;
  } else if (input === "box6") {
    box6.innerHTML = text;
  } else if (input === "box7") {
    box7.innerHTML = text;
  } else if (input === "box8") {
    box8.innerHTML = text;
  } else if (input === "box9") {
    box9.innerHTML = text;
  }

  // Increment
  count++;

  // Game Winning Conditions
  // 123 456 789 147 258 369 159 357

  // Game Winning Conditions For O

  // Set 1
  if (
    box1.innerHTML === "O" &&
    box2.innerHTML === "O" &&
    box3.innerHTML === "O"
  ) {
    alert("O User Win");
    reset();
  }

  // Set 2
  else if (
    box4.innerHTML === "O" &&
    box5.innerHTML === "O" &&
    box6.innerHTML === "O"
  ) {
    alert("O User Win");
    reset();
  }

  // Set 3
  else if (
    box7.innerHTML === "O" &&
    box8.innerHTML === "O" &&
    box9.innerHTML === "O"
  ) {
    alert("O User Win");
    reset();
  }

  // Set 4
  else if (
    box1.innerHTML === "O" &&
    box4.innerHTML === "O" &&
    box7.innerHTML === "O"
  ) {
    alert("O User Win");
    reset();
  }

  // Set 5
  else if (
    box2.innerHTML === "O" &&
    box5.innerHTML === "O" &&
    box8.innerHTML === "O"
  ) {
    alert("O User Win");
    reset();
  }

  // Set 6
  else if (
    box3.innerHTML === "O" &&
    box6.innerHTML === "O" &&
    box9.innerHTML === "O"
  ) {
    alert("O User Win");
    reset();
  }

  // Set 7
  else if (
    box1.innerHTML === "O" &&
    box5.innerHTML === "O" &&
    box9.innerHTML === "O"
  ) {
    alert("O User Win");
    reset();
  }

  // Set 8
  else if (
    box3.innerHTML === "O" &&
    box5.innerHTML === "O" &&
    box7.innerHTML === "O"
  ) {
    alert("O User Win");
    reset();
  }

  // Game Winning Conditions For X

  // Set 1
  if (
    box1.innerHTML === "X" &&
    box2.innerHTML === "X" &&
    box3.innerHTML === "X"
  ) {
    alert("X User Win");
    reset();
  }

  // Set 2
  else if (
    box4.innerHTML === "X" &&
    box5.innerHTML === "X" &&
    box6.innerHTML === "X"
  ) {
    alert("X User Win");
    reset();
  }

  // Set 3
  else if (
    box7.innerHTML === "X" &&
    box8.innerHTML === "X" &&
    box9.innerHTML === "X"
  ) {
    alert("X User Win");
    reset();
  }

  // Set 4
  else if (
    box1.innerHTML === "X" &&
    box4.innerHTML === "X" &&
    box7.innerHTML === "X"
  ) {
    alert("X User Win");
    reset();
  }

  // Set 5
  else if (
    box2.innerHTML === "X" &&
    box5.innerHTML === "X" &&
    box8.innerHTML === "X"
  ) {
    alert("X User Win");
    reset();
  }

  // Set 6
  else if (
    box3.innerHTML === "X" &&
    box6.innerHTML === "X" &&
    box9.innerHTML === "X"
  ) {
    alert("X User Win");
    reset();
  }

  // Set 7
  else if (
    box1.innerHTML === "X" &&
    box5.innerHTML === "X" &&
    box9.innerHTML === "X"
  ) {
    alert("X User Win");
    reset();
  }

  // Set 8
  else if (
    box3.innerHTML === "X" &&
    box5.innerHTML === "X" &&
    box7.innerHTML === "X"
  ) {
    alert("X User Win");
    reset();
  }
}

function reset() {
  box1.innerHTML = "";
  box2.innerHTML = "";
  box3.innerHTML = "";
  box4.innerHTML = "";
  box5.innerHTML = "";
  box6.innerHTML = "";
  box7.innerHTML = "";
  box8.innerHTML = "";
  box9.innerHTML = "";
  count = 1;
}

// var myName = "Ali";
// myName = "Huzaifa";
// console.log(myName);

// var firstName = "Ali";
// var lastName = "Huzaifa";

// if (firstName === "Ali" && lastName === "Huzaifa") {
//   console.log("Name Matched");
// } else {
//   console.log("Name Not Matched");
// }
