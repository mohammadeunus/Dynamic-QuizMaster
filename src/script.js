 
const singleSelectQuizTemplate = `
<ul>
<li>
  <input type="radio" name="answer" id="a" class="answer">
  <label for="a" id="a_text">Answer</label>
</li>
<li>
  <input type="radio" name="answer" id="b" class="answer">
  <label for="b" id="b_text">Answer</label>
</li>
<li>
  <input type="radio" name="answer" id="c" class="answer">
  <label for="c" id="c_text">Answer</label>
</li>
<li>
  <input type="radio" name="answer" id="d" class="answer">
  <label for="d" id="d_text">Answer</label>
</li>
</ul>
`; 

const multiSelectQuizTemplate = `
<ul>
<li>
  <input type="checkbox" name="answer" id="a" class="answer">
  <label for="a" id="a_text">Answer</label>
</li>
<li>
  <input type="checkbox" name="answer" id="b" class="answer">
  <label for="b" id="b_text">Answer</label>
</li>
<li>
  <input type="checkbox" name="answer" id="c" class="answer">
  <label for="c" id="c_text">Answer</label>
</li>
<li>
  <input type="checkbox" name="answer" id="d" class="answer">
  <label for="d" id="d_text">Answer</label>
</li>
</ul>
`;

const booleanQuestionTemplate = `
<ul>

<li>
  <div class="row" style="display: inline-block;">
  <div class="col-8">
    <p>Is the sky blue?</p>
  </div>
  <div class="col-2">
    <input type="radio" name="answer_a" id="a_true" class="answer" value="true">
    <label for="a_true" id="a_true_text">Yes</label>
  </div>
  <div class="col-2">
    <input type="radio" name="answer_a" id="a_false" class="answer" value="false">
    <label for="a_false" id="a_false_text">No</label>
  </div>
  </div>
</li>
<!-- 

<li style="display: inline-block;">
  <input type="radio" name="answer_b" id="b_true" class="answer" value="true">
  <label for="b_true" id="b_true_text">Yes</label>
  <input type="radio" name="answer_b" id="b_false" class="answer" value="false">
  <label for="b_false" id="b_false_text">No</label>
</li>
<li style="display: inline-block;">
  <input type="radio" name="answer_c" id="c_true" class="answer" value="true">
  <label for="c_true" id="c_true_text">Yes</label>
  <input type="radio" name="answer_c" id="c_false" class="answer" value="false">
  <label for="c_false" id="c_false_text">No</label>
</li>
<li style="display: inline-block;">
  <input type="radio" name="answer_d" id="d_true" class="answer" value="true">
  <label for="d_true" id="d_true_text">Yes</label>
  <input type="radio" name="answer_d" id="d_false" class="answer" value="false">
  <label for="d_false" id="d_false_text">No</label>
</li> -->
</ul>
`;


debugger
const quiz = document.getElementById("quiz");
const quizBody = document.getElementById("quizBody");

quizBody.innerHTML = multiSelectQuizTemplate;


const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const loadingProgress = document.getElementById("loading-bar-progress");


const booleanQuestionData = [
  {
    order: 1,
    questionText: "Is the sky blue?",
    correctAnswer: true
  },
  {
    order: 2,
    questionText: "Is water wet?",
    correctAnswer: true
  },
  {
    order: 3,
    questionText: "Is the Earth flat?",
    correctAnswer: false
  },
  {
    order: 4,
    questionText: "Is the Earth round?",
    correctAnswer: true
  }
];


const quizData = [
  {
    question: "Which language runs in a web browsers?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d"
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b"
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a"
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b"
  }
];


let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

submitBtn.addEventListener("click", () => {
	debugger
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;
    loadingProgress.style.width = `${(currentQuiz * 100) / quizData.length}%`;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>

                <button onclick="location.reload()">Reload <i class="fa-solid fa-arrows-rotate"></i></button>
            `;
    }
  }
});




