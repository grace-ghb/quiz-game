const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let correctAnswers = true;
let score = 0;
let questionCounter = 0;
let availQuestions = [];

let questions = [
    {
        question: 'What is a Computer Network?',
        choice1: 'Internet Service Provider',
        choice2: 'Computer that are 1connected Together',
        choice3: 'Fiber Optic Cables',
        answer: 2,
    },
    {
        question: 'What is a ?',
        choice1: 'Internet Service Provider',
        choice2: 'Computer that are 1connected Together',
        choice3: 'Fiber Optic Cables',
        answer: 2,
    },
]

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availQuestions = [...questions];
    getNextQuestions();
};

getNextQuestions=() => {

    if(availQuestions.lenght===0 || questionCounter > MAX_QUESTIONS){
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

    correctAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!correctAnswers) return;
       
        correctAnswers = false;
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