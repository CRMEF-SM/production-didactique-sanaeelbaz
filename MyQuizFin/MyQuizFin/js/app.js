

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resulteBox = document.querySelector(".result-box");
const timeBox = document.querySelector("time-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


// push the uestions into availableQuestions Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

// Set question number and question and options
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " de " + quiz.length;

    //Set question text
    //Set random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //Get the position of questionIndex from the availableQuestion Array
    const index1= availableQuestions.indexOf(questionIndex);
    //Remove the questionIndex from the availableQuestion Array , so the question does not repeat
    availableQuestions.splice(index1,1);
    
    //Set options
    //Get the length of options
    const optionLen = currentQuestion.options.length
    // push the uestions into availableQuestions Array
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
}
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    //Create options in html
    for(let i=0; i<optionLen; i++){
        //Random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)]
        //Get the position of optonIndex from the availableOptions Array
        const index2 = availableOptions.indexOf(optonIndex);
        //Remove the optonIndex from availableOptions, so that the optio does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id= optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option;className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter++
}

//Get result of current attempt question
function getResult(element){
    const id = parseInt(element.id);
    //Get the answer by comparing the id of clicked option
    if(id == currentQuestion.answer){
        //Set the green color to the correct option
        element.classList.add("correct");
        //Add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        //Set the red color to the incorrect option
        element.classList.add("wrong");
        //Add the indicator to incorrect mark
        updateAnswerIndicator("wrong");

        //If the answer is incorrect the show the correct option by adding green color to the correct answer
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

//Make all the options unclickable once the user select a option (Restrict the user to change the option again)
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0 ; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next() { 
    if(questionCounter === quiz.length){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    //when the quiz is over, the  timer stops
    //window.clearInterval(update);
    clearInterval(countdownTimer);
     upgradeTime = "-";
    //Hide quiz Box
    quizBox.classList.add("hide");
    //Show result Box
    resulteBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resulteBox.querySelector(".total-question").innerHTML = quiz.length;
    resulteBox.querySelector(".total-attempt").innerHTML = attempt;
    resulteBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resulteBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resulteBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resulteBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
    //Hide timeBox
    timeBox.classList.add("hide");
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}



function goToHome(){
//Accueil

}

// ### STARTING POINT ###

function startQuiz(){
    //start timer
	upgradeTime = 90;
	seconds = upgradeTime;
    //Hide home box
    homeBox.classList.add("hide");
    //Show quiz box
    quizBox.classList.remove("hide");
    // First we will set all questions in availableQuestions Array
    setAvailableQuestions();
    // Second we will call getNewQuestion(); function
    getNewQuestion();
    //To create indicator of answers
    answersIndicator();
}

function timer() {
    var days        = Math.floor(seconds/24/60/60);
    var hoursLeft   = Math.floor((seconds) - (days*86400));
    var hours       = Math.floor(hoursLeft/3600);
    var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
    var minutes     = Math.floor(minutesLeft/60);
    var remainingSeconds = seconds % 60;
    function pad(n) {
    return (n < 10 ? "0" + n : n);
    }
    document.getElementById('countdown').innerHTML = "Temps resté : " + pad(minutes) + ":" + pad(remainingSeconds);
    if (seconds == 0) {
    clearInterval(countdownTimer);
    document.getElementById('countdown').innerHTML = "le Temps est terminé !! (TIME OVER) ";
    quizBox.classList.add("hide");
    resulteBox.classList.remove("hide");
    quizResult();
    } else {
    seconds--;
    }
    }
    var countdownTimer = setInterval('timer()', 1000);
    window.onload = function (){
        homeBox.querySelector(".total-question").innerHTML = quiz.length;
    }
    