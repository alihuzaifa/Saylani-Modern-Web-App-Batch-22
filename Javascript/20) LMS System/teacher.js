
var modal = document.getElementById("userModal");
var table = document.getElementById("userTable");
var userName = document.getElementById("name");
var age = document.getElementById("age");
var education = document.getElementById("education");
var userTable = document.getElementById("userTable");
var allTeachers = []

function displayTeachers() {
    userTable.innerHTML = ""
    for (var i = 0; i < allTeachers.length; i++) {
        var item = allTeachers[i]
        userTable.innerHTML += `<tr>
            <td>${i + 1}</td>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.education}</td>
            <td><button>✏️</button><button onclick="deleteTeacher('${i}')">❌</button></td>
          </tr>`
    }
}

displayTeachers()

function saveTeacher() {
    var obj = {
        name: userName.value,
        age: age.value,
        education: education.value,
        id: Date.now()
    }

    allTeachers.push(obj);

    // Reset the fields
    userName.value = ""
    age.value = ""
    education.value = ""

    // Close modal
    closeModal();

    displayTeachers()
}


function deleteTeacher(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        allTeachers.splice(Number(index), 1)
        displayTeachers()
    }

}
