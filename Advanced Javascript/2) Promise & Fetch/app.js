// ========================= 1) PROMISE =========================

// Promise ek callback leta hai jis me do parameter hote hain: resolve aur reject
// kaam ho gaya -> resolve()   |   kaam fail ho gaya -> reject()

// function callback(resolve, reject) {
//     let taskUpdate = false;
//     if (taskUpdate) {
//         resolve("Work has been done")
//     } else {
//         reject("404 not found")
//     }
// }

// let getPromiseData = new Promise(callback);


// resolve wali value .then me aati hai

// function success(message) {
//     console.log(message);
// }


// reject wali value .catch me aati hai

// function error(message) {
//     console.log(message);
// }

// getPromiseData.then(success).catch(error)




// ========================= 2) FETCH (WEB API) =========================

// fetch bhi ek promise return karta hai
// pehla .then -> response milta hai, usko .json() se convert karna parta hai
// dusra .then -> asli data milta hai

// function convertedData(data) {
//     return data.json()
// }


// function success(message) {
//     console.log(message);
// }


// function error(message) {
//     console.log(message);
// }

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(convertedData)
//     .then(success)
//     .catch(error)




// ========================= 3) FETCH + TEMPLATE LITERALS (CARDS) =========================

const cardContainer = document.querySelector('.card-container')

fetch("https://jsonplaceholder.typicode.com/users")
    // .then((data) => {
    //     return data.json()
    // })
    .then(data => data.json())
    .then(convertedData => {
        for (var i = 0; i < convertedData.length; i++) {
            const item = convertedData[i];
            console.log(item);

            cardContainer.innerHTML += `<div class="card">
      <div class="card-header">
        <div class="profile">MR</div>

        <h2>${item.name}</h2>
      </div>

      <div class="card-body">
        <div class="info">
          <div class="icon">✉</div>
          <div class="details">
            <span>Email</span>
            <strong>${item.email}</strong>
          </div>
        </div>

        <div class="info">
          <div class="icon">☎</div>
          <div class="details">
            <span>Phone</span>
            <strong>${item.phone}</strong>
          </div>
        </div>

        <div class="info">
          <div class="icon">⌂</div>
          <div class="details">
            <span>Address</span>
            <strong>${item.address.city} ${item.address.street}</strong>
          </div>
        </div>

        <div class="company">
          <div class="company-title">Company Details</div>
          <p><strong>Company:</strong>${item.company.name}</p>
        </div>
      </div>
    </div>`
        }
    })
    .catch(error => console.error(error))
