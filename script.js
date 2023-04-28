// variables
var quiz = document.getElementById("quiz");
var finalScore = document.getElementById("finalscore");
var gameover = document.getElementById("gameover");
var questions = document.getElementById("questions");
var timer = document.getElementById("timer");
var start = document.getElementById("start");
var highscore = document.getElementById("highscore");
var startPage = document.getElementById("startPage");
var scoreContainer = document.getElementById("scorecontainer");
var scorePage = document.getElementById("scorepage");
var initials = document.getElementById("initials");
var scoreInitials = document.getElementById("scoreinitials");
var end = document.getElementById("end");
var submit = document.getElementById("submit");
var scoreDisplay = document.getElementById("scoredisplay");
var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");
var d = document.getElementById("d");
var clear = document.getElementById("clear");


var quizQuestions = [
  {
    question: "How can you access an element using id?",
    answerA: "var articlesDiv = document.querySelectorAll('articles')",
    answerB: "var articlesDiv = innerhtml.getElementById('articles')",
    answerC: "var articlesDiv = document.getElementById('articles')",
    answerD: "var articlesDiv = body.getElementById('articles')",
    correctAnswer: "c"
  },
  {
    question: "How do you store all h4 elements in a variable?",
    answerA: "var siteTitles = document.querySelectorAll('h4');",
    answerB: "var siteTitles = document.getElementById('h4');",
    answerC: "var siteTitles = document.createElement('h4');",
    answerD: "var siteTitles = document.setAttribute('h4');",
    correctAnswer: "a"
  },
  {
    question: "What does CSS stand for?",
    answerA: "Consecutive Syle Sheets",
    answerB: "Cascading Style Sheets",
    answerC: "Cascading Style Software",
    answerD: "Collapsible Style Software",
    correctAnswer: "b"
  },
  {
    question: "What is stopPropagation();?",
    answerA: "An html extension",
    answerB: "Moves you to the top of the screen",
    answerC: "An add event listener",
    answerD: "Stops event from bubbling up and new window opening",
    correctAnswer: "d"
  },
  {
    question: "How do you call a function?",
    answerA: "nameOfFunction();",
    answerB: "nameOfFunction{};",
    answerC: "1-800-function;",
    answerD: "nameOfFunction[];",
    correctAnswer: "a"
  },  
  {
    question: "What does API in Web API stand for?",
    answerA: "Applicable Programming Interface",
    answerB: "Applied Programming Information",
    answerC: "Application Programming Interface",
    answerD: "Applicable Programming Information",
    correctAnswer: "c"
  },
  {
    question: "What does console.log(this); do?",
    answerA: "logs time interval using this",
    answerB: "logs window object using this",
    answerC: "logs style using this",
    answerD: "logs local storage using this",
    correctAnswer: "b"
  },
  ];

    var finalQuestionIndex = quizQuestions.length;
    var questionIndex = 0;
    var timeLeft = 76;
    var timerInterval;
    var score = 0;
    var correct;

// functions and event listeners

function generateQuestion(){
    gameover.style.display = "none";
    if (questionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[questionIndex];
    questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
    a.innerHTML = currentQuestion.answerA;
    b.innerHTML = currentQuestion.answerB;
    c.innerHTML = currentQuestion.answerC;
    d.innerHTML = currentQuestion.answerD;
};

function startQuiz(){
    gameover.style.display = "none";
    startPage.style.display = "none";
    scorePage.style.display = "none";
    end.style.display = "none";
    start.style.display = "none";
    highscore.style.display = "none";
    a.style.display = "block";
    b.style.display = "block";
    c.style.display = "block";
    d.style.display = "block";
    generateQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quiz.style.display = "block";
};

function showScore(){
    quiz.style.display = "none";
    gameover.style.display = "block";
    clearInterval(timerInterval);
    initials.value = "";
    finalScore.innerHTML = "You score is " + score + " out of " + quizQuestions.length + " correct!";
};

submit.addEventListener("click", function highscore(){
    if(initials.value === "") {
        alert("Cannot be blank!");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var user = initials.value.trim();
        var currentHighscore = {
            name : user,
            score : score
        };
    
        gameover.style.display = "none";
        scoreContainer.style.display = "flex";
        scorePage.style.display = "block";
        end.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

function generateHighscores(){
  scoreInitials.innerHTML = "";
  scoreDisplay.innerHTML = "";
  highscore.style.display = "none";
  header.style.display = "block";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        scoreInitials.appendChild(newNameSpan);
        scoreDisplay.appendChild(newScoreSpan);
    }
};

function showHighscore(){
    startPage.style.display = "none"
    gameover.style.display = "none";
    scoreContainer.style.display = "flex";
    scorePage.style.display = "block";
    end.style.display = "flex";
    clear.style.display = "block";
    generateHighscores();
};

function clearScore(){
    window.localStorage.clear();
    scoreInitials.textContent = "";
    scoreDisplay.textContent = "";
};

function check(answer){
    correct = quizQuestions[questionIndex].correctAnswer;

    if (answer === correct && questionIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        questionIndex++;
        generateQuestion();
    } else if (answer !== correct && questionIndex !== finalQuestionIndex){
        alert("Incorrect")
        timeLeft = timeLeft - 10;
        questionIndex++;
        generateQuestion();
    } else {
        showScore();
    }
};

start.addEventListener("click",startQuiz);