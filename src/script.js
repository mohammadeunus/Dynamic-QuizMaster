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
    <input type="radio" name="answer" id="a_true" class="answer" value="true">
    <label for="a_true" id="a_true_text">Yes</label>
    <input type="radio" name="answer" id="a_false" class="answer" value="false">
    <label for="a_false" id="a_false_text">No</label>
  </li>
</ul>
`;

const quiz = document.getElementById("quiz");
const quizSelection = document.getElementById("quiz-selection");
const quizContent = document.getElementById("quiz-content");
const quizBody = document.getElementById("quizBody");
const questionEl = document.getElementById("question");
const submitBtn = document.getElementById("submit");
const previousBtn = document.getElementById("previous");
const loadingProgress = document.getElementById("loading-bar-progress");

let currentQuiz = 0;
let score = 0;
let selectedQuizType = '';
let quizData = [];

const singleSelectQuizData = [
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
    d: "Helicopters Terminals Motorboats Lamborghinis",
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

const multiSelectQuizData = [
  {
    question: "Select the programming languages.",
    a: "JavaScript",
    b: "BananaScript",
    c: "Python",
    d: "Ruby",
    correct: ["a", "c", "d"]
  },
  {
    question: "Select the CSS frameworks.",
    a: "Bootstrap",
    b: "Foundation",
    c: "Angular",
    d: "Bulma",
    correct: ["a", "b", "d"]
  },
  {
    question: "Select the HTML tags.",
    a: "<div>",
    b: "<banana>",
    c: "<span>",
    d: "<p>",
    correct: ["a", "c", "d"]
  },
  {
    question: "Select the JavaScript libraries.",
    a: "React",
    b: "Vue",
    c: "Angular",
    d: "JQuery",
    correct: ["a", "b", "d"]
  }
];

const booleanQuizData = [
  {
    question: "Is the sky blue?",
    correct: true
  },
  {
    question: "Is water wet?",
    correct: true
  },
  {
    question: "Is the Earth flat?",
    correct: false
  },
  {
    question: "Is the Earth round?",
    correct: true
  }
];

document.querySelectorAll(".quiz-type-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedQuizType = btn.getAttribute("data-type");
    startQuiz();
  });
});

function startQuiz() {
  quizSelection.style.display = "none";
  quizContent.style.display = "block";
  previousBtn.style.display = "none";
  submitBtn.innerText = "Next";

  switch (selectedQuizType) {
    case "single":
      quizData = singleSelectQuizData;
      break;
    case "multi":
      quizData = multiSelectQuizData;
      break;
    case "boolean":
      quizData = booleanQuizData;
      break;
  }

  loadQuiz();
}

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  switch (selectedQuizType) {
    case "single":
      quizBody.innerHTML = singleSelectQuizTemplate;
      document.getElementById("a_text").innerText = currentQuizData.a;
      document.getElementById("b_text").innerText = currentQuizData.b;
      document.getElementById("c_text").innerText = currentQuizData.c;
      document.getElementById("d_text").innerText = currentQuizData.d;
      break;
    case "multi":
      quizBody.innerHTML = multiSelectQuizTemplate;
      document.getElementById("a_text").innerText = currentQuizData.a;
      document.getElementById("b_text").innerText = currentQuizData.b;
      document.getElementById("c_text").innerText = currentQuizData.c;
      document.getElementById("d_text").innerText = currentQuizData.d;
      break;
    case "boolean":
      quizBody.innerHTML = booleanQuestionTemplate;
      document.getElementById("a_true_text").innerText = "Yes";
      document.getElementById("a_false_text").innerText = "No";
      break;
  }
}

function deselectAnswers() {
  const answerEls = document.querySelectorAll(".answer");
  answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
  const answerEls = document.querySelectorAll(".answer");
  let answers = [];

  answerEls.forEach(answerEl => {
    if (answerEl.checked) {
      answers.push(answerEl.id);
    }
  });

  return answers;
}

submitBtn.addEventListener("click", () => {
  const answers = getSelected();

  if (answers.length) {
    const currentQuizData = quizData[currentQuiz];
    if (selectedQuizType === "single") {
      if (answers[0] === currentQuizData.correct) {
        score++;
      }
    } else if (selectedQuizType === "multi") {
      if (JSON.stringify(answers.sort()) === JSON.stringify(currentQuizData.correct.sort())) {
        score++;
      }
    } else if (selectedQuizType === "boolean") {
      const correctAnswer = currentQuizData.correct.toString();
      if (answers[0] === `a_${correctAnswer}`) {
        score++;
      }
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

previousBtn.addEventListener("click", () => {
  if (currentQuiz > 0) {
    currentQuiz--;
    loadQuiz();
  }
});
