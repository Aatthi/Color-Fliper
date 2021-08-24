const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.querySelector('.progress-bar-full');



let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];


fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {

        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
   
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100 }%`;

    
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);

    acceptingAnswers = true;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100 }%`;
    

};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        console.log(e.target)

        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const  selectedAnswer = selectedChoice.dataset["number"];

        const classesToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classesToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classesToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classesToApply);
            getNewQuestion();
        }, 1000)
                


        console.log(classesToApply)


       
    })
})

incrementScore = num => {
    score += num; 
    scoreText.innerText = score;
}


