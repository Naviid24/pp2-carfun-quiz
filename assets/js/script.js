
/*jshint esversion: 6 */
// Questions for the quiz are stored in an array below.
// Each question is an object with value of the question text and  an array with 4 objects and each object have 2 properties
const questions = [
    {
        question: "Who is the only person in Britain who does not need a driving licence?",
        answers: [
            {text: "The King", correct: true},
            {text: "Prime minister", correct: false},
            {text: "Royal family", correct: false},
            {text: "Prince Harry", correct: false},
        ]
    },
    {
        question: "If you could drive upwards at 60mph, how long would it take to get to the Moon?",
        answers: [
            {text: "Just under 12 months", correct: false},
            {text: "Just under 24 months", correct: false},
            {text: "Just under 8 months", correct: false},
            {text: "Just under 6 months", correct: true},
        ]
    },
    {
        question: "In the average car’s lifetime, how many owners will it have?",
        answers: [
            {text: "Five", correct: false},
            {text: "Four", correct: true},
            {text: "Three", correct: false},
            {text: "Six", correct: false},
        ]
    },
    {
        question: "In what country do drivers over the age of 75 have to display a special sign in the back of their car to let drivers know they are old?",
        answers: [
            {text: "France", correct: false},
            {text: "The UK", correct: false},
            {text: "Japan", correct: true},
            {text: "South Korea", correct: false},
        ]
    },
    {
        question: "What percentage of the world’s population drives on the left?",
        answers: [
            {text: "45%", correct: false},
            {text: "35%", correct: true},
            {text: "25%", correct: false},
            {text: "20%", correct: false},
        ]
    },
    {
        question: "Which famous Entrepreneur drove with no licence plate?",
        answers: [
            {text: "Jeff Bezos", correct: false},
            {text: "Elon Musk", correct: false},
            {text: "Mark Zuckerberg", correct: false},
            {text: "Steve Jobs - and legally too! A loophole in California vehicle laws allows anyone with a brand new car six months to affix a licence plate.", correct: true},
        ]
    },
    {
        question: "What percentage of all registered cars in Albania are Mercedes Benz?",
        answers: [
            {text: "90%", correct: false},
            {text: "80%", correct: true},
            {text: "70%", correct: false},
            {text: "50%", correct: false},
        ]
    },
    {
        question: "What percentage of all Rolls-Royce’s cars ever produced are still on the road?",
        answers: [
            {text: "75%", correct: true},
            {text: "80%", correct: false},
            {text: "70%", correct: false},
            {text: "60%", correct: false},
        ]
    },
    {
        question: "What is the highest amount of people on record to be crammed into a Smart car?",
        answers: [
            {text: "20", correct: true},
            {text: "30", correct: false},
            {text: "10", correct: false},
            {text: "15", correct: false},
        ]
    },
    {
        question: "What is the highest vehicle mileage on record?",
        answers: [
            {text: "4,039,122", correct: false},
            {text: "3,500,000", correct: false},
            {text: "3,039,122", correct: true}, 
            {text: "4,000,000", correct: false}, 
        ]
    }

];


// Base code structure credit: https://www.youtube.com/watch?v=xZXW5SnCiWI
// Global variables to track the quiz state
// Contains current question index, user's score
const questionQuiz = document.getElementById('question-line');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const startButton = document.getElementById('start-btn');
const welcomeBox = document.getElementsByClassName('welcome-box')[0];
const quizBox = document.getElementsByClassName('quiz-box')[0];
let timeCount = document.getElementById('count'); 
let answerSelected = false;
let currentQuestionIndex = 0;
let score = 0;
let counter;
let count = 15;
//After entire of the web page has been loaded the welcome box will show up
document.addEventListener("DOMContentLoaded", function(){
    welcomeBox.classList.add("activeWelcomeLoad");
    clearInterval(counter);
});

//Add event listenet to start button to start the quiz
startButton.addEventListener("click", function(){
    welcomeBox.classList.remove("activeWelcomeLoad"); //Hide welcome box
    quizBox.classList.add("activeQuiz");              //Show quiz section
    changeBackgroundImage();                          //change the background of the page
    startQuiz();                                      //To show shw question and answers options
    clearInterval(counter);
    startTimer(count);
});

//To shuffle the questions array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//To change the background image
function changeBackgroundImage(){
    let backGround = document.getElementsByTagName('main')[0];
    backGround.style.backgroundImage = "url('assets/images/black-dodge.avf.jpg')";
}

//To show the questions up in the quiz box
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    answerSelected = false; // Reset the flag
    shuffle(questions); // Shuffle questions before starting the quiz
    showQuestion();  
}

//To show the question
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ;
    questionQuiz.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
          button.addEventListener('click', selectAnswer);  
        });
        
    }


// Reset the state of the quiz box
function resetState(){
    clearInterval(counter);
    startTimer(count);
    nextButton.style.display = "none";
    while(answerButtons.hasChildNodes()){
        answerButtons.removeChild(answerButtons.firstChild);
    }
     answerSelected = false; //reset the flag
     document.removeEventListener("keydown", handleKeyPress); 
}

// Handle answer selection
function selectAnswer(event){
    let selectedBtn = event.target ;
    let isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
        clearInterval(counter);
    }else{
        selectedBtn.classList.add('incorrect');
        clearInterval(counter);
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } 
        button.disabled = true;
    });
    nextButton.style.display = 'block';
    answerSelected = true; //set the flag to true
    document.addEventListener("keydown", handleKeyPress);
}

// Handle key press for Enter key
function handleKeyPress(event) {
    if (event.key === "Enter" && answerSelected) { // Check if an answer has been selected
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        } 
        event.preventDefault();  // Prevent default Enter key action
    }
}

// Show the user's score
function showScore(){
    resetState();
    questionQuiz.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Handle the Next button click
function handleNextButton(){
    currentQuestionIndex++;
    clearInterval(counter);
    startTimer(count);
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();

    }
}

// Add click event listener to the Next button
nextButton.addEventListener('click', () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
        clearInterval(counter);
        startTimer(count);
    }else {
        startQuiz();
    }
});

//To set a 15sec time for the user to choose an answer
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent ="Time Left "+ time ;
        time--;
        if(time < 9){
        timeCount.textContent ="Time Left" + " 0"+ time;
        }
        if (time < 0){
            clearInterval(counter);
            timeCount.innerHTML="Time Off";
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct) {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
            nextButton.style.display = 'block';
            answerSelected = true;
            document.addEventListener("keydown", handleKeyPress);
        }
    }
}
