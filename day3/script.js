const form = document.getElementById("user-form");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const displayBox = document.getElementById("display-box");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const dobInput = document.getElementById("dob");
const genderInput = document.getElementsByName("gender");
const hobbiesInput = document.getElementsByName("hobbies");
const countryInput = document.getElementById("country");

const allSubmissions = JSON.parse(localStorage.getItem("allSubmissions")) || [];

let editIndex = null;

function renderJSON() {
  displayBox.innerHTML = ""

  allSubmissions.forEach((entry, index) => {
    const div = document.createElement("div");

    const pre = document.createElement("pre");
    pre.textContent = JSON.stringify(entry, null, 4);

    const pencilIcon = document.createElement("i");
    pencilIcon.className = "fa-solid fa-pencil icon";

    pencilIcon.addEventListener("click", () => loadFormForEdit(index));

    div.appendChild(pre);
    div.appendChild(pencilIcon);

    displayBox.appendChild(div);
  });
}

renderJSON()

function loadFormForEdit(index) {
  const data = allSubmissions[index];
  editIndex = index;
  console.log("Form Edit data", data);

  document.getElementById("name").value = data.name;
  document.getElementById("email").value = data.email;
  document.getElementById("age").value = data.age;
  document.getElementById("dob").value = data.dob;
  document.getElementById("country").value = data.country;

  form.querySelectorAll("input[name='gender']").forEach((g) => {
    g.checked = data.gender == g.value;
  });

  form.querySelectorAll('input[name="hobbies"]').forEach((h) => {
    h.checked = data.hobbies.includes(h.value);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  body.classList.toggle("dark-theme");

  if (body.classList.contains("light-theme")) {
    themeToggle.textContent = "Switch to Dark Mode";
  } else {
    themeToggle.textContent = "Switch to Light Mode";
  }
});

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
ageInput.addEventListener("input", validateAge);
dobInput.addEventListener("change", validateDOB);
genderInput.forEach((g) => {
  g.addEventListener("change", validateGender);
});

hobbiesInput.forEach((h) => {
  h.addEventListener("change", validateHobbies);
});

countryInput.addEventListener("change", validateCountry);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const dob = document.getElementById("dob").value;
  const gender = document.querySelector("input[name='gender']:checked");
  const hobbies = Array.from(
    document.querySelectorAll("input[name='hobbies']:checked")
  ).map((el) => el.value);
  const country = document.getElementById("country").value;

  console.log("Name : ", name);
  console.log("Email : ", email);
  console.log("Age : ", age);
  console.log("DOB : ", dob);
  console.log("Gender : ", gender);
  console.log("Hobbies : ", hobbies);
  console.log("Country : ", country);

  const isValid =
    validateName() &
    validateEmail() &
    validateAge() &
    validateDOB() &
    validateGender() &
    validateHobbies() &
    validateCountry();

  if (!isValid) return;

  const userData = {
    name,
    email,
    age: Number(age),
    dob,
    gender: gender.value,
    hobbies,
    country,
  };

  console.log("user Data => ", userData);

  if (editIndex != null) {
    allSubmissions[editIndex] = userData;
    editIndex = null;
  } else {
    allSubmissions.push(userData);
  }

  localStorage.setItem("allSubmissions", JSON.stringify(allSubmissions));

  renderJSON()

  form.reset();
  window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"})
});

function validateName() {
  const name = nameInput.value.trim();

  if (name.length < 2 || name.length > 50) {
    showError("name", "Name must be between 2 and 50 characters.");
    return false;
  }

  showError("name", "");
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();

  console.log("Email ", email);

  if (!email) {
    showError("email", "Email is required");
    return false;
  }

  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    showError("email", "Enter a valid Email: (ex: john.doe@example.com)");
    return false;
  }

  showError("email", "");
  return true;
}

function validateAge() {
  const age = ageInput.value.trim();

  if (age == "") {
    showError("age", "Age is Required");
    return false;
  } else if (isNaN(Number(age))) {
    showError("age", "Only numbers are allowed");
    return false;
  } else if (age < 1 || age > 120) {
    showError("age", "Age must be a number between 1 and 120");
    return false;
  }

  showError("age", "");
  return true;
}

function validateDOB() {
  const dob = dobInput.value;

  if (!dob) {
    showError("dob", "Date of Birth is required");
    return false;
  } else {
    const today = new Date();
    const birtdate = new Date(dob);

    if (birtdate > today) {
      showError("dob", "Date of Birth cannot be in the future");
      return false;
    }
  }

  showError("dob", "");
  return true;
}

function validateGender() {
  const gender = Array.from(genderInput);
  const selected = gender.filter((g) => g.checked);

  if (selected.length < 1) {
    showError("gender", "Please select your gender");
    return false;
  }

  showError("gender", "");
  return selected[0].value ? true : false;
}

function validateHobbies() {
  const hobbies = Array.from(hobbiesInput);
  const selected = hobbies.filter((h) => h.checked).map((s) => s.value);

  if (selected.length == 0) {
    showError("hobbies", "Please select at least one hobby");
    return false;
  }

  showError("hobbies", "");
  return selected ? true : false;
}

function validateCountry() {
  const country = countryInput.value;

  if (!country) {
    showError("country", "Please select a country");
    return false;
  }

  showError("country", "");
  return true;
}

function showError(fieldId, message) {
  document.getElementById(`error-${fieldId}`).textContent = message;
}
