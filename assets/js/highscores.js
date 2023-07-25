const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join('');

//function to clear highscores from storage
function clearHighScores() {
    localStorage.removeItem('highScores');
}

clearHighScores();
displayHighScores();