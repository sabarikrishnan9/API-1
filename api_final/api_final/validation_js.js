const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginbutton = document.querySelector("#login");
const registerbutton = document.querySelector("#register");
const pagetitle = document.querySelector(".page-title");
const signupbutton = document.querySelector("#signup");
const constraint = document.querySelector(".constraints");
let emailVal;
let passwordVal;
let users = [
  { email: "sabari@gmail.com", password: "!Aa12345" },
  { email: "krishnan@gmail.com", password: "!Aa12345" },
];

signupbutton.addEventListener("click", (e) => {
  e.preventDefault();
  loginbutton.classList.add("block");
  registerbutton.classList.add("unblock");
  pagetitle.innerText = "Register now";
  signupbutton.innerText = "One step ahead to Login";
  clearError(email);
  clearError(password);
  clearError_login(loginbutton);
  password.value = "";
});

email.addEventListener("input", function (event) {
  // emailVal=event.target.value;
  clearError(email);
  constraint.classList.add("blockit");
});

password.addEventListener("input", function (event) {
  // passwordVal=event.target.value;
  clearError(password);
  constraint.classList.add("blockit");
});

loginbutton.addEventListener("click", (e) => {
  if (!validateInputs()) {
    e.preventDefault();
    setError_login(loginbutton, "Enter valid credentials!!");
  } else {
    e.preventDefault();
    setSuccess_login(loginbutton, "Login Successful!!");
  }
});

function emailExists(email) {
  return users.some((user) => user.email === email);
}

function passwordExists(password) {
  return users.some((user) => user.password === password);
}

function validateInputs() {
  emailVal = email.value;
  passwordVal = password.value;

  let success = true;
  let flag1 = false;
  let flag2 = false;

  if (emailVal === "") {
    success = false;
    setError(email, "Email is required");
  } else if (!validateEmail(emailVal)) {
    success = false;
    setError(email, "Please enter a valid email");
  } else {
    if (emailExists(emailVal)) {
      setSuccess(email);
      flag1 = true;
    } else {
      success = false;
      setError(email, "Email does not exist");
    }
  }
  if (passwordVal === "") {
    success = false;
    setError(password, "Password is required");
  } else {
    if (passwordExists(passwordVal)) {
      setSuccess(password);
      flag2 = true;
    } else {
      success = false;
      setError(password, "Password does not exist");
    }
  }

  if (flag1 && flag2) {
    window.location.href = "index_api.html";
  }

  return success;
}

function setError(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");
  // errorElement.innerText = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
}

function clearError(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");
  errorElement.innerText = "";
  inputGroup.classList.remove("error");
  inputGroup.classList.remove("success");
}
function clearError_login(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error2");
  errorElement.innerText = "";
  inputGroup.classList.remove("error");
  inputGroup.classList.remove("success");
}

function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");
  // errorElement.innerText = message;
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error");
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

registerbutton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateInputs_2()) {
    setSuccess_login(registerbutton, "Registration Successful!!");
    loginbutton.classList.remove("block");
    registerbutton.classList.remove("unblock");
    pagetitle.innerText = "Login Page";
    signupbutton.innerText = "Signup";
    clearError(email);
    clearError(password);
  }
});

function validateInputs_2() {
  emailVal = email.value;
  passwordVal = password.value;

  let success1 = true;
  let success2 = true;
  let success = false;
  let newUser = {};

  if (emailVal === "") {
    success1 = false;
    setError2(email, "Email is required");
  } else if (!validateEmail(emailVal)) {
    success1 = false;
    setError2(email, "Please enter a valid email");
  } else {
    if (users.some((user) => user.email === emailVal)) {
      setError2(email, "Email already exists");
      success1 = false;
    } else {
      setSuccess2(email);
      newUser.email = emailVal;
    }
  }
  if (passwordVal === "") {
    success2 = false;
    setError2(password, "Password is required");
  } else if (passwordVal.length < 8) {
    success2 = false;
    setError2(password, "Password must be at least 8 characters");
  } else if (!/\d/.test(passwordVal)) {
    success2 = false;
    setError2(password, "Must contain at least one number.");
  } else if (!/[a-z]/.test(passwordVal)) {
    success2 = false;
    setError2(password, "Must contain a lowercase letter.");
  } else if (!/[A-Z]/.test(passwordVal)) {
    success2 = false;
    setError2(password, "Must contain an uppercase letter.");
  } else {
    setSuccess2(password);
    newUser.password = passwordVal;
  }

  if (success1 === true && success2 === true) {
    success = true;
  }

  users.push(newUser);
  return success;
}

function setError2(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");
  errorElement.innerText = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
}

function setSuccess2(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");
  // errorElement.innerText = message;
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error"); // ch1
}

function setError_login(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error2");
  errorElement.innerText = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
}

function setSuccess_login(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error2");
  errorElement.innerText = message;
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error"); // ch1
}
