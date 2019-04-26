const STORE = {
    score: 0,
    index: -1,
}

const QUESTIONS = [
    {
        question: "NaCl is the chemical formula of:",
        choices: ["Sodium chloride", "Nitrous chloride", "Ammonia", "Nano calcium"],
        answer: 0,
    },
    {
        question: "Bronze is an alloy consisting of two or more metals. What are they?",
        choices: ["Copper and zinc", "Copper and tin", "Copper and gold", "Copper and lead"],
        answer: 2,
    },
    {
        question: "Water is made of 1 oxygen molecule and _____ hydrogen atoms.",
        choices: ["3", "2", "1", "4"],
        answer: 1,
    },
    {
        question: "The _____ is the smallest unit of matter.",
        choices: ["Element", "Atom", "Molecule", "Electron"],
        answer: 1,
    },
    {
        question: "An _____ bond is a bond in which electrons are transferred.",
        choices: ["Covalent", "Double", "Ionic", "Hydrogen"],
        answer: 2,
    },
    {
        question: "An acid has a pH below _____.",
        choices: ["7", "8", "9", "10"],
        answer: 0,
    },
    {
        question: "The water molecule is _____, because there is an uneven distribution of electron within the molecule.",
        choices: ["Uneven", "Distributed", "Polar", "Even"],
        answer: 2,
    },
    {
        question: "The atom is made of 3 subatomic particles. The subatomic particle found in the nucleus with a positive charge is the _____.",
        choices: ["Electron", "Proton", "Neutron", "Quark"],
        answer: 1,
    }
];

function incrementIndex() {
    STORE.index += 1;
}

function incrementScore() {
    STORE.score += 1;
}

function resetStore() {
    STORE.index = 0;
    STORE.score = 0;
}

function renderQuestionNumber() {
    $('#js-question-number').text(STORE.index + 1);
}

function renderScore() {
    $('#js-score').text(STORE.score);
}

function renderQuestion() {
    const question = QUESTIONS[STORE.index].question;
    const choices = QUESTIONS[STORE.index].choices;
    const choiceList = choices.map(generateChoice).join("");

    $('#js-quiz-form').empty();
    $('#js-quiz-form')
        .append(`<h1>${question}</h1>`)
        .append(choiceList)
        .append(`<button type="submit">Submit</button>`);
}

function generateChoice(choice, index) {
    return `<input type="radio" value=${index} name="choice" required><label for="choice-${index}">${choice}</label>`
}

function renderStart() {
    renderQuestionNumber();
    renderScore();
    $('#js-quiz-form').empty();
    $('#js-result')
        .append(`<h1>Are you ready to test your Chemistry knowledge?</h1>`)
        .append(`<button class="next-button">Start Quiz!</button>`)
}

function gradeQuestion() {
    const selected = $("input[name='choice']:checked").val();
    const answer = QUESTIONS[STORE.index].answer;
    if (selected == answer) STORE.score += 1;
}

function renderResult() {
    const selected = $("input[name='choice']:checked").val();
    const answer = QUESTIONS[STORE.index].answer;
    const answerText = QUESTIONS[STORE.index].choices[answer];
    const feedback = selected == answer ? 'Correct!' : `Incorrect, the answer is ${answerText}`;

    $('#js-quiz-form').empty();
    $('#js-result')
        .append(`<h1>${feedback}</h1>`)
        .append(`<button class="next-button">Next Question</button>`)
}

function renderEnd() {
    const score = (STORE.score / QUESTIONS.length) * 100;

    $('#js-result').empty();
    $('#js-result')
        .append(`<h1>You scored ${score}% on this quiz!</h1>`)
        .append(`<button id="reset-button">Try Again!</button>`)
}

function handleReset() {
    $('#js-result').on('click', '#reset-button', function(event) {
        event.preventDefault();
        $('#js-result').empty();
        resetStore();
        renderQuestion();
        renderQuestionNumber();
        renderScore();
    });
}

function handleNext() {
    $('#js-result').on('click', '.next-button', function(event) {
        event.preventDefault();
        $('#js-result').empty();
        incrementIndex();
        
        if (STORE.index > QUESTIONS.length - 1) {
            renderEnd();
        } else {
            renderQuestionNumber();
            renderQuestion();
        }
    })
}

function handleSubmit() {
    $('#js-quiz-form').submit(function(event) {
        event.preventDefault();
        gradeQuestion();
        renderScore();
        renderResult();
    })
}

function mainApp() {
    renderStart();
    handleNext();
    handleSubmit();
    handleReset();
}

$(mainApp);
