//  DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');

const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');

const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.querySelector('.progress');

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false }
        ]
        },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "O2", correct: false },

            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "NaCl", correct: false }
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    }
]

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    console.log("Quiz started");
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}

function showQuestion() {
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + '%';

    questionText.textContent = currentQuestion.question;

    // to do:
    answersContainer.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answers-btn');

        // dataset
        button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswer);

        answersContainer.appendChild(button);
    });
}
function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else if(button === selectedButton){
            button.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if(percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius";
    } else if(percentage >= 80) {
        resultMessage.textContent = "Great job, you know your stuff";
    } else if(percentage >= 60) {
        resultMessage.textContent = "Good effort, keep learning";
    } else if(percentage >= 40) {
        resultMessage.textContent = "Not bad, try again to improve";
    } else{
        resultMessage.textContent = "Keep studying, you'll get better";
    }
}

function restartQuiz() {
   resultScreen.classList.remove('active');
   startQuiz();
}