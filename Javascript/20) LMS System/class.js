
var modal = document.getElementById("userModal");
var table = document.getElementById("userTable");
var userName = document.getElementById("name");
var userTable = document.getElementById("userTable");
var allClasses = []

function displayClass() {
    userTable.innerHTML = ""
    for (var i = 0; i < allClasses.length; i++) {
        var item = allClasses[i]
        userTable.innerHTML += `<tr>
            <td>${i + 1}</td>
            <td>${item.name}</td>
            <td><button>✏️</button><button onclick="deleteTeacher('${i}')">❌</button></td>
          </tr>`
    }
}

displayClass()

function saveClass() {
    var obj = {
        name: userName.value,
        id: Date.now()
    }

    allClasses.push(obj);

    // Reset the fields
    userName.value = ""

    // Close modal
    closeModal();

    displayClass()
}


function deleteTeacher(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        allClasses.splice(Number(index), 1)
        displayClass()
    }

}
