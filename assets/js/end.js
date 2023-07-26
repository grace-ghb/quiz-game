const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalSCore = document.querySelector('#finalSCore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

//let finalScore;
//let saveHighScore;

// Convert a Javascript Object Notation(JSON) string into an object
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// max number of high scores to keep in the list.
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

//To enable the save button
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);

    highScores.sort((a, b) => {
        return b.score - a.score;
    });

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');
};