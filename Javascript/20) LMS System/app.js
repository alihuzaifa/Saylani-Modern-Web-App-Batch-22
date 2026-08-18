// var paragraphs = document.getElementsByTagName("p");
// paragraphs[1].innerHTML = "Hello World"


// var paragraphs = document.getElementsByClassName('para')
// console.log(paragraphs[0]);



// var paragraph = document.querySelector('#heading')
// var paragraph = document.querySelectorAll('.para')
// console.log(paragraph);


var modal = document.getElementById("userModal");
var table = document.getElementById("userTable");
var userName = document.getElementById("name");
var age = document.getElementById("age");
var education = document.getElementById("education");
var userTable = document.getElementById("userTable");
var allStudents = []

function displayStudents() {
    userTable.innerHTML = ""
    for (var i = 0; i < allStudents.length; i++) {
        var item = allStudents[i]
        userTable.innerHTML += `<tr>
            <td>${i + 1}</td>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.education}</td>
            <td><button>✏️</button><button onclick="deleteStudent('${i}')">❌</button></td>
          </tr>`
    }
}

displayStudents()

function saveStudent() {
    var obj = {
        name: userName.value,
        age: age.value,
        education: education.value,
        id: Date.now()
    }

    allStudents.push(obj);

    // Reset the fields
    userName.value = ""
    age.value = ""
    education.value = ""

    // Close modal
    closeModal();

    displayStudents()
}


function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        allStudents.splice(Number(index), 1)
        displayStudents()
    }

}
