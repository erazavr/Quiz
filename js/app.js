const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//Пушим вопросы в массив availableQuestions
const setAvailableQuestions = () => {
  for (let i = 0; i < quiz.length; i++) {
    availableQuestions.push(quiz[i]);
  }
};
// Устанавливаем номер вопроса, вопрос и варианты
const getNewQuestion = () => {
  // Устанавливаем номер вопроса
  questionNumber.innerHTML = `Question ${questionCounter + 1} of ${
    quiz.length
  }`;
  // Устанавливаем текст вопроса
  // Получаем случайный вопрос
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;

  // Получаем позицию questionIndex из массива availableQuestions
  const index1 = availableQuestions.indexOf(questionIndex);

  // Убираем questionIndex из массива availableQuestions, чтобы вопрос не повторялся
  availableQuestions.splice(index1, 1);

  // Устанавливаем варианты ответов
  // Получаем длину масива с вариантами
  const optionLength = currentQuestion.options.length;

  // Пушим варианты ответов в массив availableOptions
  for (let i = 0; i < optionLength; i++) {
    availableOptions.push(i);
  }
  optionContainer.innerHTML = "";
  let animationDelay = 0.15;

  // Создаем варианты ответов в html
  for (let i = 0; i < optionLength; i++) {
    // Случайный вариант
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    // Получаем позицию optionIndex из availableOptions
    const index2 = availableOptions.indexOf(optionIndex);
    // Удаляем optionIndex из availableOptions, чтобы вариант ответа не повторялся
    availableOptions.splice(index2, 1);

    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }
  questionCounter++;
};

//Получаем результат текущей попытки вопроса
const getResult = (el) => {
  const id = +el.id;
  // Получаем ответ сравнивая id по клику варианта
  if (id === currentQuestion.answer) {
    // Устанавливаем зелееый цвет правильному ответу
    el.classList.add("correct");
    //добавляем индикатор со знаком верно
    updateAnswerIndicator("correct");
    correctAnswers++;
  } else {
    // Устанавливаем красный цвет не правильному ответу
    el.classList.add("wrong");
    //добавляем индикатор со знаком неверно
    updateAnswerIndicator("wrong");
    const optionLength = optionContainer.children.length;
    for (let i = 0; i < optionLength; i++) {
      if (+optionContainer.children[i].id === currentQuestion.answer) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unclickableOptions();
};
// Делаем все варианты некликаьельными , если вариант ответа уже выбрали
const unclickableOptions = () => {
  const optionLength = optionContainer.children.length;
  for (let i = 0; i < optionLength; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
};
const answerIndicator = () => {
  answerIndicatorContainer.innerHTML = "";
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement("div");
    answerIndicatorContainer.appendChild(indicator);
  }
};
const updateAnswerIndicator = (markType) => {
  answerIndicatorContainer.children[questionCounter - 1].classList.add(
    markType
  );
};
const next = () => {
  if (questionCounter === quiz.length) {
    console.log("quiz over");
    quizOver();
  } else {
    getNewQuestion();
  }
};
const quizOver = () => {
  //Скрываем quizBox
  quizBox.classList.add("hide");
  //Показываем результат
  resultBox.classList.remove("hide");
  quizResult();
};
const quizResult = () => {
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  const percentage = (correctAnswers / quiz.length) * 100;
  resultBox.querySelector(".percentage").innerHTML =
    percentage.toFixed(2) + "%";
  resultBox.querySelector(".total-score").innerHTML =
    correctAnswers + " / " + quiz.length;
};
const resetQuiz = () => {
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
};
const tryAgainQuiz = () => {
  //Скрываем resultBox
  resultBox.classList.add("hide");
  //Показываем quizBox
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
};
const goToHome = () => {
  // Скрываем result box
  resultBox.classList.add("hide");
  // Показываем home box
  homeBox.classList.remove("hide");
  resetQuiz();
};
// #### ОТПРАВНАЯ ТОЧКА ####
function startQuiz() {
  // Скрываем home box
  homeBox.classList.add("hide");
  // Показываем quiz Box
  quizBox.classList.remove("hide");
  //Сперва мы пушим все вопросы в массив availableQuestions
  setAvailableQuestions();
  // Затем мы вызываем функцию getNewQuestion
  getNewQuestion();
  //Создаем индикатор ответов
  answerIndicator();
}
window.onload = function () {
  homeBox.querySelector(".total-questions").innerHTML = quiz.length;
};
