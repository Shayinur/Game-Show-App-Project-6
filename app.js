//step2 - Get the elements you’ll need from your HTML
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset')
const phraseList = document.querySelector('#phrase ul');
const heart = document.querySelectorAll('.tries img');

//Create a missed variable, initialized to 0
let missed = 0;


//Step 3 - Attach a event listener to the “Start Game” button to hide the start screen overlay.
startButton.addEventListener('click', () => {
    overlay.style.display='none';      
});

//Step 4 - Create a phrases array that contains at least 5 different phrases as strings.
const phrases = [
    'i think therefore i am',
    'you are what you eat',
    'live life to the fullest',
    'big egos have little ears',
    'well begun is half done'
];

//Step 5 - Create a getRandomPhraseAsArray function
function getRandomPhraseAsArray(arr){
    let randomPhrase = arr[Math.floor(Math.random()* arr.length)];
    return randomPhrase.split('');
} 


//Step 6 - Set the game display
function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++){
        const li = document.createElement('li');
        li.textContent = arr[i];
        phraseList.append(li);
        if(arr[i] === " ") {
            li.className = "space"; 
        } else {
            li.className = "letter";
        }
    }
}
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 

//Step 7 -  Create a checkLetter function
const checkLetter = button => {
    const checkLetter = document.querySelectorAll('li');
    let match = null;
    for (let i = 0; i < checkLetter.length; i++) {
        if (checkLetter[i].textContent === button) {
            checkLetter[i].classList.add('show');
            match = button;
        }
    }
    return match;
}

//Step 8 - Add an event listener to the keyboard
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className !== 'chosen') {
        e.target.className = 'chosen';
        const checked = checkLetter(e.target.textContent);
        if (checked === null) {
            //const heart = document.querySelectorAll('.tries img');
            heart[missed].src = 'images/lostHeart.png';
            missed ++;
         }
    }
    checkWin();
});

//Step 9 - Count the missed guesses in the game.
const checkWin = () => {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const headline = document.querySelector('.title');
    if (letter.length === show.length) {
        overlay.classList.add('win');
        headline.textContent = 'You win!';
        overlay.style.display = 'flex';
        reset();
    } else if (missed > 4) {
        overlay.classList.add('lose');
        headline.textContent = 'You lose.';
        overlay.style.display = 'flex';
        reset();
    }
}

//step 10 - Create a checkWin function.
function reset() {
    missed = 0;
    ul.innerHTML = '';
    const resetPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(resetPhrase);
    const chosenBtn = document.querySelectorAll('button');
    for (let i = 0; i < chosenBtn.length; i++) {
        chosenBtn[i].classList.remove('chosen');
    }
    for (let i = 0; i < heart.length; i++) {
        heart[i].src = 'liveHeart.png';
    }
}