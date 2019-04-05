$(document).ready(function () {
  var questionBank = [{
      question: "Who is Beyonce married to?",
      answers: [
        "Drake",
        "Jay-Z",
        "Kanye West",
        "Dr. Dre"
      ],
      correctAnswer: "Jay-Z"
    },
    {
      question: "At what location did the cast of 'Friends' often meet?",
      answers: [
        "Central Park",
        "Corner Park",
        "Central Perk",
        "Corner Perk"
      ],
      correctAnswer: "Central Perk"

    },
    {
      question: "What American President passed away in December of 2018 at the age of 94?",
      answers: [
        "Bill Clinton",
        "Jimmy Carter",
        "Ronald Regan",
        "George H W Bush"
      ],
      correctAnswer: "George H W Bush"
    },
    {
      question: "Who's famous phrase is 'Float like a butterfly, sting like a bee?'",
      answers: [
        "Muhammed Ali",
        "Hulk Hogan",
        "Mike Tyson",
        "John Cena"
      ],
      correctAnswer: "Muhammed Ali"

    },
    {
      question: "Who is Marshall Mathers?",
      answers: [
        "Snoop Dogg",
        "Eminem",
        "Post Malone",
        "Rae Sremmurd"
      ],
      correctAnswer: "Eminem"
    },
  ]


  var correct = 0;
  var timeLeft;

  function newGameButton() {
    $(".button-div").html(`<button class="btn btn-warning mb-4 new-game">Try Again?</button>`)
    $(".new-game").on("click", function () {
      correct = 0;
      timer = startGame();

      renderQnA();

    });
  }


  function startGame() {
    timeLeft = 30;
    var timer = setInterval(countdown, 1000);
    return timer;
  }

  function countdown() {
    if (timeLeft == 0) {
      $(".clock").text("0");
      clearTimeout(timer);
      $(".quiz").text(`Time's up! You got ${correct} out of 5 correct!`);
      newGameButton();
    } else {
      $(".clock").text(timeLeft);
      timeLeft--;
    }
  }

  var timer = startGame();

  function renderQnA() {
    $(".quiz").empty();
    $(".button-div").empty();
    for (var i = 0; i < questionBank.length; i++) {
      var questionDiv = $('<div>');
      var questionObject = questionBank[i];
      var questionText = questionObject.question;
      var q = $(`<h4>`).addClass("mt-4 p-2");
      q.text(questionText);
      q.appendTo(questionDiv);

      for (var j = 0; j < questionObject.answers.length; j++) {
        var a = $(`<label>`).addClass("pr-3 pl-1 pb-3");
        var r = $(`<input>`).addClass("radio-inline");
        var answerText = questionObject.answers[j];

        r.attr({
            type: "radio",
            "data-answer": answerText,
            value: answerText,
            name: [i]
          })
          .appendTo(questionDiv);
        a.text(answerText).appendTo(questionDiv);

        $(".quiz").append(questionDiv);

      }
    }
  }

  renderQnA();

  $(".submit").on("click", function () {
    clearTimeout(timer);
    for (var i = 0; i < questionBank.length; i++) {
      var checkCorrect = questionBank[i].correctAnswer;

      var pickedAnswer = $(`[name=${i}]:checked`).val();

      if (pickedAnswer === checkCorrect) {
        correct++;
      }
    }

    $(".quiz").text(`You got ${correct} out of 5 correct!`);
    newGameButton();


  });
});