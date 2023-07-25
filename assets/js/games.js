const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let startGame;
let getNewQuestion;
let incrementScore;

let questions = [
    {
        question: 'Malayisia',
        choice1: 'Hong Kong',
        choice2: 'Kuala Lumpur',
        choice3: 'Beijing',
        answer: 2,
    },
    {
        question: 'Italy',
        choice1: 'Warsaw',
        choice2: 'Paris',
        choice3: 'Rome',
        answer: 3,
    },
    {
        question: 'Poland',
        choice1: 'Dublin',
        choice2: 'Prague',
        choice3: 'Warsaw',
        answer: 3,
    },
    {
        question: 'China',
        choice1: 'Hanoi',
        choice2: 'Beijing',
        choice3: 'Shanghai',
        answer: 2,
    },
    {
        question: 'Russia',
        choice1: 'Bratislava',
        choice2: 'Moscow',
        choice3: 'Warsaw',
        answer: 2,
    },
    {
        question: 'Morocco',
        choice1: 'Rabat',
        choice2: 'Istanbul',
        choice3: 'Cairo',
        answer: 1,
    },
    {
        question: 'France',
        choice1: 'Vienna',
        choice2: 'Paris',
        choice3: 'Prague',
        answer: 2,
    },
    {
        question: 'Peru',
        choice1: 'Lukut',
        choice2: 'Lima',
        choice3: 'Buenos Aires',
        answer: 2,
    },
    {
        question: 'Bhutan',
        choice1: 'Madras',
        choice2: 'Ceylon',
        choice3: 'Thimphu',
        answer: 3,
    },
    {
        question: 'Cambodia',
        choice1: 'Phnom Penh',
        choice2: 'Perth',
        choice3: 'Paris',
        answer: 1,
    },

];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};


/**..
 * To store data in localStorage
 * localStorage.setItem(key, value);
 * 
 * window.location.assign to redirect the user to a new page
 * e.g: window.location.assign("https://www.example.com/newpage")
 */

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        // Keep track of the score
        return window.location.assign('end.html');
    }

    questionCounter++;


    // This is where show the question 1 of 3, 2 of 3 etc.  
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

    // Progression of the progress bar by %
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // Calculate the question index
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    // Keep track of what question is on
    currentQuestion = availableQuestions[questionIndex];

    // The question ask
    question.innerText = currentQuestion.question;

    // dataset from data-number="1"
    choices.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });

    // Remove element from an arrays and insert new elements in their place
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        /** Return statement is used to end the execution of a function and return a value back to the caller
         * */

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 800);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();