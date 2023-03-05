// Variáveis para controlar o cronômetro
let timerId;
let isRunning = false;
let milliseconds = 0;
let lapTimes = [];

// Seletores do DOM
const timerDisplay = document.getElementById("timer");
const lapTimesDisplay = document.getElementById("lap-times");

// Formata o tempo em horas, minutos, segundos e milissegundos
function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const millisecondsFormatted = ("00" + (milliseconds % 1000)).slice(-3);
  const timeArray = [hours, minutes, seconds];
  return timeArray
    .map((value) => value.toString().padStart(2, "0"))
    .join(":") +
    "." +
    millisecondsFormatted;
}

// Atualiza o display do cronômetro com o tempo formatado
function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(milliseconds);
}

// Atualiza o display das marcações de tempo
function updateLapTimesDisplay() {
  lapTimesDisplay.innerHTML = "";
  lapTimes.forEach((time, index) => {
    const lapTime = document.createElement("p");
    lapTime.textContent = `Volta ${index + 1}: ${formatTime(time)}`;
    lapTimesDisplay.appendChild(lapTime);
  });
}

// Inicia o cronômetro
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerId = setInterval(() => {
      milliseconds += 10;
      updateTimerDisplay();
    }, 10);
    timerDisplay.classList.remove("paused");
  }
}

// Para o cronômetro
function stopTimer() {
  clearInterval(timerId);
  isRunning = false;
  timerDisplay.classList.add("paused");
}

// Reinicia o cronômetro e as marcações de tempo
function resetTimer() {
  stopTimer();
  milliseconds = 0;
  lapTimes = [];
  updateTimerDisplay();
  updateLapTimesDisplay();
}

// Adiciona uma marcação de tempo
function lapTimer() {
  if (isRunning) {
    lapTimes.push(milliseconds);
    updateLapTimesDisplay();
  }
}
