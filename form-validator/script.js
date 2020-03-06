const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password2");

//Show input error message
function showError (input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const smallElement = formControl.querySelector("small");
  smallElement.innerText = message;
}

//Show input success outline
function showSuccess (input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success"
}

//Check if the email is valid
function checkEmail (input) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (regex.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//Get field name
function getFieldName (input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//check input length
function checkLength (input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`)
  } else {
    showSuccess(input);
  }
}

//Check if passwords match
function checkPasswordsMatch (input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do no match");
  }
}

//Event Listners
form.addEventListener("submit", e => {
  e.preventDefault();

  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPassword);
});