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

let questions = [
    {
        question: 'Which of the following muscles (or muscle groups), if overactive, would cause anterior pelvic tild',
        choice1: 'Glutes',
        choice2: 'Hip Flexors',
        choice3: 'Hamstrings',
        choice4: 'Hip Externals',
        answer: 2,
    },
    {
        question:
            "Which of the following is true for acute wry neck",
        choice1: "Bilateral neck pain",
        choice2: "referred pain contralateral side",
        choice3: "unilateral pain",
        choice4: "bilateral ROM restriction",
        answer: 3,
    },
    {
        question: "Which tendon irritates a Subacromial Bursa",
        choice1: "Supraspinatus",
        choice2: "Infraspinatus",
        choice3: "Upper Trapezius",
        choice4: "Pectoralis Major",
        answer: 1,
    },

    {
        question: 'What exercise is involved in the initial Managmnt for Subacromial Bursitis',
        choice1: 'Isometric strengthening',
        choice2: 'Proprioception training',
        choice3: 'Taping',
        choice4: 'Active Assisted ROM Exercise',
        answer: 4,
    },
    {
        question: "What is the special test for ATFL sprain",
        choice1: "Anterior Draw Test",
        choice2: "Talar Tilt",
        choice3: "Thomas Test",
        choice4: "Passive Accessory Movement",
        answer: 1,
    },
    {
        question: "What is the longest muscle in the body",
        choice1: "Biceps",
        choice2: "Lattisimus Dorsi",
        choice3: "Sartorius",
        choice4: "Pectoralis Major",
        answer: 3,
    },
];

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
        //go to the end page
        return window.location.assign('/end.html');
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


startGame();