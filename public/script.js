let questions = [];
let currentQuestionIndex = 0;
let score = 0;

function fetchQuestions() {
    fetch('./questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion();
        })
        .catch(error => console.error('Error:', error));
}

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const submitButton = document.getElementById('submit-btn');

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionContainer.textContent = question.question;

        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => selectOption(index);
            optionsContainer.appendChild(button);
        });

        submitButton.style.display = 'block';
        submitButton.onclick = submitAnswer;
    } else {
        showResult();
    }
}

function selectOption(index) {
    const options = document.querySelectorAll('#options-container button');
    options.forEach((option, i) => {
        option.classList.toggle('selected-option', i === index);
    });
}


function submitAnswer() {
    const selectedOption = document.querySelector('.selected-option');
    if (selectedOption) {
        const selectedAnswer = selectedOption.textContent;
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedAnswer === currentQuestion.answer) {
            score++;
        }

        currentQuestionIndex++;
        displayQuestion();
    } else {
        alert('Please select an answer before submitting.');
    }
}

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h1>Quiz Completed</h1>
        <p>Your score: ${score} out of ${questions.length}</p>
    `;
}

fetchQuestions();