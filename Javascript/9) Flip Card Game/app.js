var card1 = document.getElementById('card1')
var card2 = document.getElementById('card2')
var card3 = document.getElementById('card3');



function flipCards() {
    card1.classList.add("animate__flip")
    card2.classList.add("animate__flip")
    card3.classList.add("animate__flip");
    var randomNumber = Math.ceil(Math.random() * 3);
    if (randomNumber === 1) {
        card1.src = "images/a.png"
        card2.src = "images/a.png"
        card3.src = "images/a.png"
    } else if (randomNumber === 2) {
        card1.src = "images/king.jfif"
        card2.src = "images/king.jfif"
        card3.src = "images/king.jfif"
    } else if (randomNumber === 3) {
        card1.src = "images/joker.jfif"
        card2.src = "images/joker.jfif"
        card3.src = "images/joker.jfif"
    }
}
