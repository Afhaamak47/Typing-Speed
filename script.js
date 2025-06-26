const start = document.getElementById("start");
const input = document.getElementById("input");
const display = document.getElementById("display");
const timer = document.getElementById("timer");
const finish = document.getElementById("finish");
const result = document.getElementById("result");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");

let sentences = [
  "Javascript is a high-level",
  "Interpreted programming language.",
  "It has curly braces.",
  "It's easy to learn.",
  "It's widely used in web development.",
  "It's also used in mobile development.",
  "It's a multi-paradigm language.",
  "It's a free and open-source language.",
];

let currentSentence = "";
let timerInterval;
let starttime;
let endtime;

start.addEventListener("click", function () {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  currentSentence = sentences[randomIndex];
  display.innerHTML = currentSentence;
  input.value = "";
  input.disabled = false;
  input.focus();
  result.innerHTML = "";
  let timeLeft = 60;
  timer.innerHTML = timeLeft;
  starttime = Date.now();

  clearInterval(timerInterval); // Clear previous timer if any
  timerInterval = setInterval(() => {
    timeLeft--;
    timer.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
      start.disabled = false;
      input.disabled = true;
    }
  }, 1000);

  start.disabled = true;
});

finish.addEventListener("click", function () {
  const typed = input.value.trim();
  clearInterval(timerInterval);
  input.disabled = true;
  start.disabled = false;
  endtime = Date.now();
  const wordsTyped = typed.split(" ");
  const wordsCorrect = currentSentence.split(" ");
  const wordsCorrected = wordsCorrect.filter((word) =>
    wordsTyped.includes(word)
  );
  let sec = (endtime - starttime) / 1000;
  let minutes = sec / 60;
  let wpms = Math.round(wordsCorrected.length / 5 / minutes);
  let accuracys = Math.round(
    (wordsCorrected.length / wordsCorrect.length) * 100
  );
  wpm.innerHTML = `WPM: ${wpms}`;
  accuracy.innerHTML = `Accuracy: ${accuracys}%`;

  if (typed === currentSentence) {
    result.innerHTML = `✅ Correct! You typed: "${typed}"`;
    result.style.color = "green";
  } else {
    result.innerHTML = `❌ Incorrect. <br> You typed: "${typed}" <br> Correct was: "${currentSentence}"`;
    result.style.color = "red";
  }
});
