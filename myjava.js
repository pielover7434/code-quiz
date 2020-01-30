function Quiz(questions) {
  this.score = 0
  this.questions = questions
  this.questionIndex = 0
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex]
}

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++
  }

  this.questionIndex++
}

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length
}

function Question(text, choices, answer) {
  this.text = text
  this.choices = choices
  this.answer = answer
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice
}

function populate() {
  if (quiz.isEnded()) {
    showScores()
  } else {
    // show question
    var element = document.getElementById('question')
    element.innerHTML = quiz.getQuestionIndex().text

    // show options
    var choices = quiz.getQuestionIndex().choices
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById('choice' + i)
      element.innerHTML = choices[i]
      guess('btn' + i, choices[i])
    }

    showProgress()
  }
};

function guess(id, guess) {
  var button = document.getElementById(id)
  button.onclick = function () {
    quiz.guess(guess)
    populate()
  }
};

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1
  var element = document.getElementById('progress')
  element.innerHTML = 'Question ' + currentQuestionNumber + ' of ' + quiz.questions.length
};

function showScores() {
  var gameOverHTML = '<h1>Result</h1>';
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + '</h2>';
  var element = document.getElementById('quiz')
  element.innerHTML = gameOverHTML
};

// create questions here
var questions = [
  new Question('Who is Dj Arash?', ['A sports cream', 'firefighter', 'Temptation in my heart', 'HTML'], 'Temptation in my heart'),
  new Question('Why do we fall?', ['So we can learn to pick ourselves up', "Because it's fun", 'Scars are cool', 'Your mom'], 'So we can learn to pick ourselves up'),
  new Question('Which is not a cereal?', ['Lucky Charms', 'Honeycombs', 'Mommajune', 'Rice Krispies'], 'MommaJune'),
  new Question('Which is a Pokemon?', ['Arnold', 'Pikachu', 'Ricky Bobby', 'Poo Bear'], 'Pikachu'),
  new Question('My humps is about', ['Music', 'Cheetos', 'Theranos', 'Anime'], 'Music')
]

// create quiz
var quiz = new Quiz(questions)

// display quiz
populate()
