'use strict';

const questions = [
    {
        question: "Which HTML tag creates a link?",
        answers: [
            "<p>", 
            "<a>", 
            "<h1>", 
            "<img>"
        ],
        correct: 1
    },
    {
        question: "Which HTML attribute gives an image alternative text?",
        answers: [
            "src", 
            "href", 
            "alt", 
            "title"
        ],
        correct: 2
    },
    {
        question: "Which CSS property changes text color?",
        answers: [
            "font", 
            "color", 
            "text", 
            "background"
        ],
        correct: 1
    },
    {
        question: "Which CSS layout is used for rows and columns?",
        answers: [
            "Grid", 
            "Float", 
            "Block", 
            "Position"
        ],
        correct: 0
    },
    {
        question: "Which keyword creates a variable that can change?",
        answers: [
            "const", 
            "let", 
            "fixed", "static"
        ],
        correct: 1
    },
    {
        question: "Which HTML tag creates the biggest heading?",
        answers: ["<h6>", "<head>", "<h1>", "<heading>"],
        correct: 2
    },
    {
        question: "Which CSS property adds space inside an element?",
        answers: ["margin", "padding", "border", "space"],
        correct: 1
    },
    {
        question: "Which JavaScript method adds an item to an array?",
        answers: ["push()", "add()", "insert()", "put()"],
        correct: 0
    },
    {
        question: "Which operator checks value AND data type?",
        answers: ["=", "==", "===", "!="],
        correct: 2
    },
    {
        question: "Which HTML tag displays an image?",
        answers: ["<image>", "<pic>", "<img>", "<src>"],
        correct: 2
    }
];

/* =================
    DOM Referrences 
   ================= */

const quizScreen = document.getElementById("quiz-screen");
const questionsContainer = document.getElementById("questions-container");

const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

let score = 0;
let answered = 0;

function loadQuestions() {

    questionsContainer.innerHTML = "";
    score = 0;
    answered = 0;

    questions.forEach((question, questionIndex) => {

        const questionCard = document.createElement("article");
        questionCard.classList.add("question-card");

        const questionNumber = document.createElement("p");
        questionNumber.classList.add("question-number");
        questionNumber.textContent = `Question ${questionIndex + 1}`;
        
        const questionText = document.createElement("h2");
        questionText.classList.add("question-text");
        questionText.textContent = question.question;

        const answersContainer = document.createElement("div");
        answersContainer.classList.add("answers-container");

        const feedback = document.createElement("p");
        feedback.classList.add("feedback");

        question.answers.forEach((answer, answerIndex) => {

            const answerButton = document.createElement("button");
            answerButton.classList.add("answer-button");
            answerButton.type = "button";
            answerButton.textContent = answer;

            answerButton.addEventListener("click", () => {
                checkAnswer(
                    answerButton,
                    answersContainer, 
                    feedback, 
                    question, 
                    answerIndex
                );
            });

            answersContainer.appendChild(answerButton);
        });

        questionCard.append(questionNumber, questionText, answersContainer, feedback);
        questionsContainer.appendChild(questionCard);
    });

    quizScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");
}

function checkAnswer(selectedButton, answersContainer, feedback, question, answerIndex) {

    const buttons = answersContainer.querySelectorAll(".answer-button");

    if (buttons[0].disabled) {
        return;
    }

    buttons.forEach((button) => {
        button.disabled = true;
    });

    if (answerIndex === question.correct) {

        selectedButton.classList.add("correct");
        feedback.textContent = "Correct!";
        feedback.classList.add("correct");
        score++;

        

    } else {

        selectedButton.classList.add("wrong");
        feedback.textContent = `Wrong! The correct answer is ${question.answers[question.correct]}`;
        feedback.classList.add("wrong");

        buttons[question.correct].classList.add("correct");
    }

    answered++;

    if (answered === questions.length) {
        
        showResult();
    }
    console.log(`Score is: ${score}`);
    console.log(`Answered questions is: ${answered}`);
}

function showResult() {

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    
    finalScore.innerHTML = `${score} / ${questions.length}`

    if (score === questions.length) {
        resultMessage.innerHTML = "Congrats! You got a perfect score!"
    } else if (score > questions.length / 2) {
        resultMessage.innerHTML = "Good job! You got more than half correct!"
    } else {   
        resultMessage.innerHTML = "Keep practicing!"
    }

}

restartButton.addEventListener("click", loadQuestions);
loadQuestions();