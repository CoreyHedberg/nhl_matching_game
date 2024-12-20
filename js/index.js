const CARDS = document.querySelectorAll(".memory-card")

function flipCard() {
  this.classList.toggle("flip")
}

CARDS.forEach((card) => card.addEventListener("click", flipCard))
