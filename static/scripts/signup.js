const form = document.querySelector('form')

const first_name = document.querySelector('#first-name')
const first_nameError = document.querySelector('.first-name .error')

const username = document.querySelector('#username')
const usernameError = document.querySelector('.username .error')

const password = document.querySelector('#password')
const passwordError = document.querySelector('.password .error')

const last_name = document.querySelector('#last-name')
const last_nameError = document.querySelector('.last-name .error')

const password2 = document.querySelector('#confirm-password')
const passwordError2 = document.querySelector('.confirm-password .error')

const email = document.querySelector('#email')
const emailError = document.querySelector('.email .error')


//Validating First Name
if(first_name.validity.valueMissing){
    first_nameError.textContent = 'First name field is required.'
}

first_name.addEventListener('input', (event) =>{ 
    if(first_name.validity.valid){
        first_nameError.textContent = ''
    } else {
        if(first_name.validity.tooShort){
            first_nameError.textContent = `First name must be 
            atleast ${first_name.minLength} characters long.`
        } 
        
        if(first_name.validity.tooLong){
            first_nameError.textContent = `First name must not be 
            longer ${first_name.maxLength} characters.`
        }
        
        if(first_name.validity.patternMismatch){
            first_nameError.textContent = `First name can only be a string of letters.`
        }
    }
})

//Validating Last Name
if(last_name.validity.valueMissing){
    last_nameError.textContent = 'Last name field is required.'
}
last_name.addEventListener('input', (event) =>{ 
    if(last_name.validity.valid){
        last_nameError.textContent = ''
    } else {
        if(last_name.validity.tooShort){
            last_nameError.textContent = `Last name must be 
            atleast ${last_name.minLength} characters long.`
        } 
        
        if(last_name.validity.tooLong){
            last_nameError.textContent = `Last name must not be 
            longer ${last_name.maxLength} characters.`
        }
        
        if(last_name.validity.patternMismatch){
            last_nameError.textContent = `Last name can only be a string of letters.`
        }
    }
})

if(email.validity.valueMissing){
    emailError.textContent = 'Email field is required.'
}

email.addEventListener('input', (event) =>{ 
    if(email.validity.valid){
        emailError.textContent = ''
    } else {
        if(email.validity.tooShort){
            emailError.textContent = `Email must be 
            atleast ${email.minLength} characters long.`
        } 
        
        if(email.validity.tooLong){
            emailError.textContent = `Email must not be 
            longer ${email.maxLength} characters.`
        }
        
        if(email.validity.patternMismatch){
            emailError.textContent = `Email field must be a valid email.`
        }
        if(email.validity.typeMismatch){
            emailError.textContent = `Email field must be a valid email.`
        }
    }
})

//Validating Username
if(username.validity.valueMissing){
    usernameError.textContent = 'Username field is required.'
}
username.addEventListener('input', (event) =>{ 
    if(username.validity.valid){
        usernameError.textContent = ''
    } else {
        if(username.validity.tooShort){
            usernameError.textContent = `Username must be 
            atleast ${username.minLength} characters long.`
        } 
        
        if(username.validity.tooLong){
            usernameError.textContent = `Username must not be 
            longer ${username.maxLength} characters.`
        }
        
        if(username.validity.patternMismatch){
            usernameError.textContent = `Username can be a string 
            starting with letters and may contain numbers.`
        }
    }
})
// Validating Password
if(password.validity.valueMissing){
    passwordError.textContent = 'Password field is required'
}
password.addEventListener('input', (event) =>{ 
    if(password.validity.valid){
        passwordError.textContent = ''
    } else {
        if(password.validity.tooShort){
            passwordError.textContent = `Password must be 
            atleast ${password.minLength} characters long.`
        } 
        
        if(password.validity.tooLong){
            passwordError.textContent = `Password must not be 
            longer than ${password.maxLength} characters.`
        }
        
        if(password.validity.patternMismatch){
            passwordError.textContent = `Password can only be alphanumeric.`
        }
    }
})

// Validating Password2
if(password2.validity.valueMissing){
    passwordError2.textContent = 'Password field is required'
}
password2.addEventListener('input', (event) =>{ 
    if(password2.value !== password.value){
        password2.setCustomValidity('Not a match')
        passwordError2.textContent = 'Passwords do not mactch.'
    } else {
        passwordError2.textContent = ''
        password2.setCustomValidity('')

    }
})

// Compare password1 and confirm password

form.addEventListener('submit', event =>{
    if(form.checkValidity()){ //submit if form is valid
        form.submit()
    } else {
        event.preventDefault()
    }
})