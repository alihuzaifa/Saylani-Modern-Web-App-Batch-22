// // var user = {
// //     name: "Ali",
// //     age: 10,
// //     education: 'Primary'
// // }

// // user.education = "Secondary"

// // console.log(user);


// var tasks = [];

// var obj = {
//     itemName: 'Bike',
//     charge: 10000
// }

// tasks.push(obj);


// console.log(tasks);




var expenseName = document.getElementById('expenseName')
var amount = document.getElementById('amount')
var list = document.getElementById('list')
var totalAmount = document.getElementById('totalAmount')

var allExpenses = []


function addExpense() {
    if (expenseName === "" || amount === "") {
        alert('Please fill the form')
    } else {
        var obj = {
            name: expenseName.value,
            amount: amount.value
        }
        allExpenses.push(obj);
        expenseName.value = "";
        amount.value = "";
        listExpense()
        showTotalAmount()
    }
}


function listExpense() {
    list.innerHTML = "";
    for (var i = 0; i < allExpenses.length; i++) {
        var item = allExpenses[i];
        list.innerHTML += `<div class="item">
          <div class="left">
            <h3>${item.name}</h3>
          </div>

          <div class="right">
            <span class="price">${item.amount}</span>

            <div class="actions">
              <button class="edit" title="Edit">✏️</button>
              <button class="delete" title="Delete">🗑️</button>
            </div>
          </div>
        </div>`
    }
}

function deleteExpense() { }
function editExpense() { };

function showTotalAmount() {
    var total = 0;
    for (var i = 0; i < allExpenses.length; i++) {
        var item = allExpenses[i];
        total += Number(item.amount)
    }
    totalAmount.innerHTML = total
}

function c() {
    // Optional: Customize configuration settings
    const options = {
        margin: 10,
        filename: 'Expense.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 }, // Higher scale means better resolution
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 3. Generate and automatically save the PDF file
    html2pdf().set(options).from(list).save();
}

listExpense()
showTotalAmount()