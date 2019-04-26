const STORE = {
    score: 0,
    index: 0,
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

function renderScore() {
    $('#js-score').text(STORE.score);
}

function renderEnd() {
    const grade = (STORE.score / 8) * 100;
    $('.js-quiz-form').hide();
    $('.js-end-page').show();
    $('.js-result').text(`You scored ${grade}% on the quiz!`);
}

function renderQuestionNumber() {
    $('#js-question-number').text(STORE.index + 1);
}

function renderQuestion() {
    const question = QUESTIONS[STORE.index].question;
    $('.js-question').text(question);
}

function generateChoice(choice, index) {
    return `<input type="radio" value=${index} name="choice"><label for="choice-${index}">${choice}</label>`
}

function renderChoices() {
    const choices = QUESTIONS[STORE.index].choices;
    const choiceList = choices.map(generateChoice).join("");
    $('.js-choices').empty();
    $('.js-choices').append(choiceList);
}

function gradeQuestion() {
    const selected = $("input[name='choice']:checked").val();
    const answer = QUESTIONS[STORE.index].answer;
    if(selected == answer) {
        incrementScore();
        $('.js-feedback-text').text('Correct!');
    } else {
        const correctAnswer = QUESTIONS[STORE.index].choices[answer];
        $('.js-feedback-text').text(`Incorrect, the answer is ${correctAnswer}`);
    }
}

function resetQuiz() {
    STORE.score = 0;
    STORE.index = 0;
    render();
    $('.js-quiz-form').show();
    $('.js-end-page').hide();
}

function render() {
    renderScore();
    renderQuestionNumber();
    renderQuestion();
    renderChoices();
}

function submitListener() {
    $('.js-quiz-form').submit(function(event) {
        event.preventDefault();
        gradeQuestion();
        $('.js-quiz-form').hide();
        $('.js-feedback').show();
        $('.js-result').hide();
        $('.js-start').hide();
    }); 
}

function nextListener() {
    $('.next-button').click(function(event) {
        console.log('clicked');
        event.preventDefault();
        $('.js-quiz-form').show();
        $('.js-feedback').hide();
        $('.js-result').hide();
        $('.js-start').hide();

        incrementIndex();
        if (STORE.index > QUESTIONS.length - 1) {
            renderEnd();
        } else {
            render();
        }
    })
}

function resetListener() {
    $('#reset-button').click(function(event) {
        event.preventDefault();
        resetQuiz();
        $('.js-quiz-form').show();
        $('.js-feedback').hide();
        $('.js-result').hide();
        $('.js-start').hide();
    })
}

function mainApp() {
    render();
    submitListener();
    nextListener();
    resetListener();
};

$(mainApp);
