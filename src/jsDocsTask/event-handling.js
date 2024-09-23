const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

const nameTooltip = document.getElementById('nameTooltip');
const emailTooltip = document.getElementById('emailTooltip');
const passwordTooltip = document.getElementById('passwordTooltip');

const validateName = () => {
  if (nameInput.value.length < 3) {
    nameError.textContent = 'Name must be at least 3 characters';
    nameError.style.display = 'block';
    return false;
  } else {
    nameError.style.display = 'none';
    return true;
  }
};

const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = 'Invalid email address';
    emailError.style.display = 'block';
    return false;
  } else {
    emailError.style.display = 'none';
    return true;
  }
};

const validatePassword = () => {
  if (passwordInput.value.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters long';
    passwordError.style.display = 'block';
    return false;
  } else {
    passwordError.style.display = 'none';
    return true;
  }
};


nameInput.addEventListener('focus', () => {
  nameTooltip.style.display = 'block';
});

emailInput.addEventListener('focus', () => {
  emailTooltip.style.display = 'block';
});

passwordInput.addEventListener('focus', () => {
  passwordTooltip.style.display = 'block';
});

nameInput.addEventListener('blur', () => {
  nameTooltip.style.display = 'none';
});

emailInput.addEventListener('blur', () => {
  emailTooltip.style.display = 'none';
});

passwordInput.addEventListener('blur', () => {
  passwordTooltip.style.display = 'none';
});


nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);


form.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isNameValid && isEmailValid && isPasswordValid) {
    alert('Form submitted successfully!');
    form.reset(); 
  } else {
    alert('Please correct the errors before submitting.');
  }
});
