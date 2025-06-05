const ground = document.querySelectorAll('.tanah');
const mole = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score-board');
const timeBoard = document.querySelector('.time-board');
const scorePopup = document.getElementById('scorePopup');
const finalScore = document.getElementById('finalScore');

let groundBefore;
let finish;
let score;
let timeLeft;
let timer;

function randomGround(ground) {
    const g = Math.floor(Math.random() * ground.length);
    const gRandom = ground[g];
    if(gRandom == groundBefore) {
        return randomGround(ground);
    }
    groundBefore = gRandom;
    return gRandom;
}

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function showMole() {
    const gRandom = randomGround(ground);
    const tRandom = randomTime(250, 1000);
    gRandom.classList.add('show');
    setTimeout(() => {
        gRandom.classList.remove('show');
        if(!finish) {
            showMole();
        }
    }, tRandom);
}

function updateTimer() {
    timeLeft--;
    timeBoard.textContent = `Time: ${timeLeft}s`;
    
    if(timeLeft <= 0) {
        clearInterval(timer);
        finish = true;
        showFinalScore();
    }
}

function start() {
    finish = false;
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
    timeLeft = 10;
    timeBoard.textContent = `Time: ${timeLeft}s`;
    
    if(timer) clearInterval(timer);
    
    timer = setInterval(updateTimer, 1000);
    
    showMole();
}

function whack() {
    if(!finish) {
        score++;
        this.parentNode.classList.remove('show');
        scoreBoard.textContent = `Score: ${score}`;
    }
}

function showFinalScore() {
    finalScore.textContent = score;
    scorePopup.style.display = 'flex';
}

function closePopup() {
    scorePopup.style.display = 'none';
}

mole.forEach(m => {
    m.addEventListener('click', whack);
});
