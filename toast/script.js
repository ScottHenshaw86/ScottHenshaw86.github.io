const toast = document.getElementById("toast");
const title = document.querySelector("h1");
const ball = document.querySelector(".ball");

let toastOpen = false;
let waving = false;
let bouncing = false;

const handleToast = () => {
  toastOpen = !toastOpen;
  if (toastOpen) {
    toast.classList.add("toastVisible");
    toast.classList.remove("toastHidden");
  } else {
    toast.classList.remove("toastVisible");
    toast.classList.add("toastHidden");
  }
};

const handleWave = () => {
  waving = !waving;
  if (waving) {
    title.classList.add("wave");
  } else {
    title.classList.remove("wave");
  }
};

const handleBounce = () => {
  bouncing = !bouncing;
  if (bouncing) {
    ball.classList.add("bounce");
  } else {
    ball.classList.remove("bounce");
  }
};
