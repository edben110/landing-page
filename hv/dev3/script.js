const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const btn = document.getElementById("btn");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const loader = document.querySelector(".loader");
const btnText = document.querySelector(".btn-text");
const successMessage = document.getElementById("successMessage");

function validateName() {
  if (nameInput.value.trim().length < 3) {
    nameError.textContent = "Debe tener al menos 3 caracteres.";
    nameInput.classList.add("invalid");
    return false;
  }
  nameError.textContent = "";
  nameInput.classList.remove("invalid");
  return true;
}

function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(emailInput.value.trim())) {
    emailError.textContent = "Ingrese un correo válido.";
    emailInput.classList.add("invalid");
    return false;
  }
  emailError.textContent = "";
  emailInput.classList.remove("invalid");
  return true;
}

function validateMessage() {
  if (messageInput.value.trim().length < 5) {
    messageError.textContent = "El mensaje es demasiado corto.";
    messageInput.classList.add("invalid");
    return false;
  }
  messageError.textContent = "";
  messageInput.classList.remove("invalid");
  return true;
}

function checkForm() {
  const valid = validateName() && validateEmail() && validateMessage();
  btn.disabled = !valid;
}

nameInput.addEventListener("input", checkForm);
emailInput.addEventListener("input", checkForm);
messageInput.addEventListener("input", checkForm);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  btn.disabled = true;
  btnText.textContent = "Enviando";
  loader.classList.remove("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");
    btnText.textContent = "Enviar";

    successMessage.classList.remove("hidden");

    form.reset();
    btn.disabled = true;

    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 3000);

  }, 2000);
});