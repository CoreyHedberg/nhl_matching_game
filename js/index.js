let hasFlippedCard = false
let lockBoard
let firstCard, secondCard
let matches = 0
let attempts = 0
const CARDS = document.querySelectorAll(".memory-card")
const TIMER = document.getElementById("timer")
const MATCHED = document.getElementById(`matched`)
const ATTEMPTS = document.getElementById(`attempts`)

TIMER.innerHTML = `08:52`
ATTEMPTS.innerText = attempts
MATCHED.innerText = matches

function flipCard() {
  if (lockBoard) return
  if (this === firstCard) return
  this.classList.add("flip")

  if (!hasFlippedCard) {
    hasFlippedCard = true
    firstCard = this
    return
  }
  secondCard = this

  checkForMatch()
}

function checkForMatch() {
  console.log(`fired`)
  // TODO: Count the number of attempts made to make a match
  let isMatch = firstCard.dataset.team === secondCard.dataset.team
  isMatch ? disableCards() : unflipCards()
  attempts++
  ATTEMPTS.innerText = attempts
  console.log(attempts)
}

// TODO: Figure out how to calculate the success percentage

function disableCards() {
  firstCard.removeEventListener("click", flipCard)
  secondCard.removeEventListener("click", flipCard)
  // TODO: Count the number of matches completed
  matches++
  MATCHED.innerText = matches
  console.log(matches)
  resetBoard()
}

function unflipCards() {
  lockBoard = true
  setTimeout(() => {
    firstCard.classList.remove("flip")
    secondCard.classList.remove("flip")
    resetBoard()
  }, 1000)
}

function resetBoard() {
  hasFlippedCard = false
  lockBoard = false
  firstCard = null
  secondCard = null
}

;(function shuffleCards() {
  CARDS.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 64)
    card.style.order = randomPosition
  })
})()

CARDS.forEach((card) => card.addEventListener("click", flipCard))
