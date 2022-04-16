// create button to start quiz
// timer nneds to start and show first question
// click answer show correct / incorrect 
// show next question
// add time for correct and deduct for wrong answer
// game ends after 3rd question or timer get to zero
// after game ends gives you score and enter your initials
// view high scores
// start game again

var startButtonEl = document.getElementById('start-btn')
var countdownEl = document.getElementById('countdown')
var mainEl = document.getElementById('main')
var myQuestions = [
    {
        question: 'What does CSS stands for?',
        answers: {
            a: 'Cola Super Sheets',
            b: 'Cascading Style Sheets',
            c: 'Core Super Soup',
        },
        correctAnswer: 'Cascading Style Sheets',
    },
    {
        question: 'Is Javascript and Java the same language?',
        answers: {
            a: 'Yes',
            b: 'Maybe',
            c: 'No',
        },
        correctAnswer: 'No'
    },
    {
        question: 'Whats the document type declaration that all HTML must start with?',
        answers: {
            a: '<!DOCTYPE html>',
            b: '<var html>',
            c: '<Function HTML>',
        },
        correctAnswer: '<!DOCTYPE html>'
    },
];

var questionEl = document.createElement('span')
var answer1 = document.createElement('button')
var answer2 = document.createElement('button')
var answer3 = document.createElement('button')

var questionIndex = 0
var timer
var quizTimer = 60
var yourInput

function runTimer() {
    timer = setInterval(function () {
        quizTimer = quizTimer - 1
        countdownEl.textContent = quizTimer
        if (quizTimer <= 0) {
            clearInterval(timer)

            //this would mean your game ended, you will need to do something at the end of your game
            endQuiz ()
        }
    }, 1000);
}

function startQuiz() {
    quizTimer = 60

    runTimer();
    //show questions here


    startButtonEl.style.display = 'none';

    mainEl.innerHTML = ''



    questionEl.innerText = myQuestions[questionIndex].question
    mainEl.appendChild(questionEl)

    answer1.value = myQuestions[questionIndex].answers.a
    answer1.innerText = myQuestions[questionIndex].answers.a
    answer1.addEventListener('click', validateAnswer)
    mainEl.appendChild(answer1)

    answer2.value = myQuestions[questionIndex].answers.b
    answer2.innerText = myQuestions[questionIndex].answers.b
    answer2.addEventListener('click', validateAnswer)
    mainEl.appendChild(answer2)

    answer3.value = myQuestions[questionIndex].answers.c
    answer3.innerText = myQuestions[questionIndex].answers.c
    answer3.addEventListener('click', validateAnswer)
    mainEl.appendChild(answer3)

};


function validateAnswer(event) {
    console.log(event.target.innerText)
    if (event.target.innerText === myQuestions[questionIndex].correctAnswer) {
        console.log("you got it right!")
        quizTimer = quizTimer + 10

    } else {
        quizTimer = quizTimer - 10
    }
    populateNextQuestion()
}

function populateNextQuestion() {
    if (myQuestions.length === questionIndex + 1) {
        console.log("end quiz")
        endQuiz()
        return
    }
    mainEl.innerHTML = ''
    questionIndex = questionIndex + 1

    questionEl.innerText = myQuestions[questionIndex].question
    mainEl.appendChild(questionEl)

    answer1.value = myQuestions[questionIndex].answers.a
    answer1.innerText = myQuestions[questionIndex].answers.a
    answer1.addEventListener('click', validateAnswer)
    mainEl.appendChild(answer1)

    answer2.value = myQuestions[questionIndex].answers.b
    answer2.innerText = myQuestions[questionIndex].answers.b
    answer2.addEventListener('click', validateAnswer)
    mainEl.appendChild(answer2)

    answer3.value = myQuestions[questionIndex].answers.c
    answer3.innerText = myQuestions[questionIndex].answers.c
    answer3.addEventListener('click', validateAnswer)
    mainEl.appendChild(answer3)

}

function endQuiz() {
    clearInterval(timer)
    mainEl.innerHTML = ''
    countdownEl.innerText = ''
    var endTitle = document.createElement("h3")
    endTitle.innerText = 'game over'
    var yourScore = document.createElement('h5')
    yourScore.innerText = "Your score is: " + quizTimer
    var yourName = document.createElement("p")
    yourName.innerText = 'enter your initials'
    yourInput = document.createElement("input")
    var submitInitials = document.createElement("button")
    submitInitials.innerText = 'submit'
    mainEl.appendChild(endTitle)
    mainEl.appendChild(yourScore)
    mainEl.appendChild(yourName)
    mainEl.appendChild(yourInput)
    mainEl.appendChild(submitInitials)
    submitInitials.addEventListener('click', saveScore)
}

function saveScore() {
    var score = {}
    score.initials = yourInput.value
    score.score = quizTimer
   var storage = JSON.parse(localStorage.getItem("highScore")) ?? setLocalStorage()

   storage.push(score)
   console.log(storage)
   localStorage.setItem("highScore", JSON.stringify(storage)) 
   showHighScore ()
}
function setLocalStorage(){
    localStorage.setItem("highScore", JSON.stringify([]))
    return JSON.parse(localStorage.getItem("highScore")) 
}

function showHighScore (){
    var storage = JSON.parse(localStorage.getItem("highScore")) ?? setLocalStorage()
    mainEl.innerHTML = ""
    // sort in desc order
    // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    storage.sort ((a, b) => (a.score > b.score) ? -1 : 1)
    for (let i = 0; i <storage.length; i++) {
        var divEl = document.createElement ("div")
        divEl.innerText = storage[i].initials + " - " + storage[i].score
        mainEl.appendChild(divEl)
    }

    var submit = document.createElement("button")
    submit.innerText = 'Start Again'
    submit.addEventListener('click', startQuiz)
    mainEl.appendChild(submit)
    


}

startButtonEl.addEventListener('click', startQuiz)
quizStarted = true;


highScore = localStorage.getItem('High Score');
