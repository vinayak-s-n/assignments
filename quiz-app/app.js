document.addEventListener("DOMContentLoaded", function () {
  var something = {};

  var url =
    "https://raw.githubusercontent.com/attainu/curriculum-master-fullstack/master/assignments/data/quiz.json?token=AOGF267IT62MFW5SU7TNLY265RYRI";

  // selecting my modals
  var modalBg = document.querySelector(".modal-bg");

  var modalTimeup = document.querySelector(".modal-time-up");

  var playAgain = document.querySelector("#again");

  // Submit functionality selecting the fields
  var submitButton = document.querySelector("#submit-button");
  var userInput = document.querySelector("#answer-input");
  function get() {
    fetch(url)
      .then(function (response) {
        return response;
      })
      .then(function (data) {
        return data.json();
      })
      .then(function (object) {
        var randomNumber = Math.floor(Math.random() * object.length);
        something = object[randomNumber];
        document.querySelector("#question-div>p").innerHTML =
          object[randomNumber].question;
      })
      .catch(function (err) {
        location.reload();
        alert("Error " + err);
      });
  }

  document.querySelector("#play-button").addEventListener("click", function () {
    get();
    countTimer();
    submitButton.removeAttribute("disabled");
    userInput.removeAttribute("disabled");
    document.querySelector("#start-button").style.display = "none";
    document.querySelector("#play-button").style.display = "none";
    document.querySelector("#p-second").style.display = "block";
  });

  document
    .querySelector("#start-button")
    .addEventListener("click", function () {
      submitButton.removeAttribute("disabled");
      userInput.removeAttribute("disabled");
      get();
      countTimer();
      document.querySelector("#start-button").style.display = "none";
      document.querySelector("#play-button").style.display = "none";
      document.querySelector("#p-second").style.display = "block";
    });

  var time = 30;
  function countTimer() {
    var timex = setInterval(function () {
      if (time <= 0) {
        clearInterval((time = 0));
        document
          .querySelector("#timer-section")
          .classList.remove("border-blink");
        document
          .querySelector("#p-second")
          .classList.remove("visibility-toggle");
        modalBg.style.visibility = "visible";

        modalTimeup.style.visibility = "visible";
      }

      document.querySelector("#timer-section").classList.toggle("border-blink");
      document.querySelector("#p-second").classList.toggle("visibility-toggle");
      document.querySelector("#seconds").innerHTML = time;
      time -= 1;
    }, 1000);
    return timex;
  }

  // event listener to my playagain button
  playAgain.addEventListener("click", function () {
    location.reload();
  });

  submitButton.addEventListener("click", function () {
    get();
    var input = userInput.value.toUpperCase();
    var answer = something.answer.toUpperCase();

    if (input == answer) {
      alert("Congratulations Correct Answer ");
    } else {
      alert("OOPS InCorrect Answer ");
    }
    userInput.value = "";
  });
});
