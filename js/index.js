let hasFlippedCard = false
let lockBoard
let firstCard, secondCard
let matches = 0
let attempts = 0
const CARDS = document.querySelectorAll(".memory-card")
const TIMER = document.getElementById("timer")
const MATCHED = document.getElementById(`matched`)
const ATTEMPTS = document.getElementById(`attempts`)
// Variables for timer
let timerMinutes = 0
let timerSeconds = 0
const MINUTES = document.getElementById("minutes")
const SECONDS = document.getElementById("seconds")

// TIMER.innerHTML = `08:52`
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
  let isMatch = firstCard.dataset.team === secondCard.dataset.team
  isMatch ? disableCards() : unflipCards()
  attempts++
  ATTEMPTS.textContent = attempts
}

// TODO: Figure out how to calculate the success percentage

function disableCards() {
  firstCard.removeEventListener("click", flipCard)
  secondCard.removeEventListener("click", flipCard)
  matches++
  MATCHED.textContent = matches
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

// Code for confetti effect
// Source: https://www.cssscript.com/confetti-falling-animation/

// Code for the timer
// Source: https://codepen.io/DevBillyM/pen/ExGgaNJ
let gameTimer = function timer() {
  timerSeconds++
  if (timerSeconds >= 60) {
    timerSeconds = 0
    timerMinutes++
  }
  MINUTES.textContent = timerMinutes.toString().padStart(2, `0`)
  SECONDS.textContent = timerSeconds.toString().padStart(2, `0`)
}

setInterval(gameTimer, 1000)

// Function for when game ends
function gameCompleted() {
  clearInterval(gameTimer)
  startConfetti()
}

if (matches == 32) {
  gameCompleted()
}

// TODO: Need to figure out why the timer is not stopping when the game is completed.
