const form = document.getElementById("user-form")
const themeToggle = document.getElementById("theme-toggle")
const body = document.body;

themeToggle.addEventListener("click",()=>{
    body.classList.toggle("light-theme")
    body.classList.toggle("dark-theme")

    if(body.classList.contains("light-theme")) {
        themeToggle.textContent = "Switch to Dark Mode"
    }else{
        themeToggle.textContent = "Switch to Light Mode"
    }
})


form.addEventListener("submit",(e)=>{
    e.preventDefault();

    document.querySelectorAll(".error").forEach((el)=>el.textContent = "")

    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const age = document.getElementById("age").value.trim()
    const dob = document.getElementById("dob").value
    const gender = document.querySelector("input[name='gender']:checked")
    const hobbies = Array.from(
        document.querySelectorAll("input[name='hobbies']:checked")
    ).map((el)=>el.value)
    const country = document.getElementById("country").value

    console.log("Name : ", name)
    console.log("Email : ", email)
    console.log("Age : ", age)
    console.log("DOB : ", dob)
    console.log("Gender : ", gender)
    console.log("Hobbies : ", hobbies)
    console.log("Country : ", country)

    let isValid = true;
    
    if(name.length < 2) {
        showError("name","Min 2 characters are required")
        isValid = false;
    }else if(name.length > 50) {
        showError("name","Max 50 characters are allowed")
        isValid = false;
    } 


    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        showError("email","Enter a valid Email: (ex: john.doe@example.com)")
        isValid = false;
    }

    // isNan("skwkl") --> true
    // isNan(15) --> false

    if(age == "") {
        showError("age","Age is Required")
        isValid = false;
    }else if(!isNaN(age)) {
        showError("age","Only numbers are allowed")
        isValid = false;
    }else if(age < 1 || age > 120) {
        showError("age","Age must be a number between 1 and 120")
        isValid = false;
    }


    if(!dob) {
        showError("dob","Date of Birth is required")
        isValid = false;
    }else{
        const today = new Date();
        const birtdate = new Date(dob);

        // console.log(today)
        // console.log(birtdate)
        if(birtdate > today) {
            showError("dob","Date of Birth cannot be in the future")
            isValid = false;
        }
    }


    if(!gender) {
        showError("gender","Please select your gender")
        isValid = false;
    }


    if(hobbies.length == 0) {
        showError("hobbies","Please select at least one hobby")
        isValid = false;
    }


    if(!country) {
        showError("country","Please select a country")
        isValid = false;
    }


    if(!isValid) return;

    
})


function showError(fieldId, message) {
    document.getElementById(`error-${fieldId}`).textContent = message;
}

// function handleSubmit