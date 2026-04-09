const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progesstext = document.getElementById("progresstext");
const scoreText = document.getElementById("score");
const progressbarfull = document.querySelector(".progressbarfull")
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What does HTML stand for?",
    choice1: "Hyper Text Markup Language",
    choice2: "Home Tool Markup Language",
    choice3: "Hyperlinks and Text Markup Language",
    choice4: "Hyper Tool Multi Language",
    answer: 1
  },
  {
    question: "Which language is used for styling web pages?",
    choice1: "HTML",
    choice2: "JQuery",
    choice3: "CSS",
    choice4: "XML",
    answer: 3
  },
  {
    question: "Which is not a JavaScript framework?",
    choice1: "Python Script",
    choice2: "React",
    choice3: "Angular",
    choice4: "Vue",
    answer: 1
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    choice1: "//",
    choice2: "/* */",
    choice3: "#",
    choice4: "<!-- -->",
    answer: 1
  },
  {
    question: "Which method is used to select an element by ID?",
    choice1: "getElementByClass()",
    choice2: "getElementById()",
    choice3: "querySelectorAll()",
    choice4: "getElementsByName()",
    answer: 2
  },
  {
    question: "Which company developed JavaScript?",
    choice1: "Microsoft",
    choice2: "Google",
    choice3: "Netscape",
    choice4: "Oracle",
    answer: 3
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    choice1: "<javascript>",
    choice2: "<js>",
    choice3: "<script>",
    choice4: "<code>",
    answer: 3
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    choice1: "var",
    choice2: "int",
    choice3: "string",
    choice4: "float",
    answer: 1
  },
  {
    question: "Which method converts JSON to a JavaScript object?",
    choice1: "JSON.stringify()",
    choice2: "JSON.parse()",
    choice3: "JSON.convert()",
    choice4: "JSON.toObject()",
    answer: 2
  },
  {
    question: "Which operator is used to assign a value?",
    choice1: "==",
    choice2: "===",
    choice3: "=",
    choice4: "!=",
    answer: 3
  }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("score", score);
        return window.location.assign("end.html");
    }

    questionCounter++;
    progesstext.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressbarfull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion["choice" + number];
    });

    acceptingAnswers = true;

}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classtoApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (classtoApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classtoApply);
        setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classtoApply);
        getNewQuestion();
        },1000);
      
    });
});
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
startGame();
