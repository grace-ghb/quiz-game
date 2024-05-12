const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availQuestions = [];

let questions = [
    {
        question: 'What kind of function accepts another function as an argument?',
        choice1: 'Anonymous function',
        choice2: 'A Higher order function',
        choice3: 'Arrow function',
        answer: 2,
    },
    {
        question: 'What kind of programming can JavaScript be used for?',
        choice1: 'Client side only',
        choice2: 'Both client and server side',
        choice3: 'Server side only',
        answer: 2,
    },
    {
        question: 'In JavaScript, which method creates a new array and returns all of the items which pass the condition specified in the callback?',
        choice1: 'filter()',
        choice2: 'concat()',
        choice3: 'split()',
        answer: 1,
    },
    {
        question: 'In JavaScript, what is the result of the following code: console.log(7-"5")?',
        choice1: 'Undefined',
        choice2: '2',
        choice3: 'NaN',
        answer: 2,
    },
    {
        question: 'What was JavaScript originally called when it was first released?',
        choice1: 'LiveScript',
        choice2: 'Java',
        choice3: 'Mocha',
        answer: 3,
    },
    {
        question: 'In JavaScript, which of the following functions accepts an image element and a file as arguments?',
        choice1: 'Database',
        choice2: 'FileUpload',
        choice3: 'Client',
        answer: 2,
    },
    {
        question: 'What does DOM stand for?',
        choice1: 'Document Object Model',
        choice2: 'Document Online Model',
        choice3: 'Data Object Model',
        answer: 1,
    },
    {
        question: 'Which of the following methods allows you to set up functions to be called when a specified event happens, such as when a user clicks a button?',
        choice1: 'callEvent()',
        choice2: 'listenEvent()',
        choice3: 'addEventListener()',
        answer: 3,
    },
    {
        question: 'In JavaScript, what are the three ways to declare a variable?',
        choice1: 'variable, let, const',
        choice2: 'var, concat, let',
        choice3: 'var, let, const',
        answer: 3,
    },
    {
        question: 'In JavaScript, what operator takes an array and spreads it into its individual elements?',
        choice1: 'Spread operator',
        choice2: 'Rest operator',
        choice3: 'Division operator',
        answer: 1,
    },
]

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availQuestions = [...questions];
    getNewQuestions();
};

getNewQuestions=() => {

    if(availQuestions.length===0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }

    questionCounter++;

    progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availQuestions.length);
    currentQuestion = availQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
       
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNextQuestion();
        }, 800);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();