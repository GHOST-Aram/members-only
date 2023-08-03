const form = document.querySelector('form')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const usernameError = document.querySelector('.username .error')
const passwordError = document.querySelector('.password .error')

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

form.addEventListener('submit', event =>{
    if(form.validity.valid){
        event.preventDefault()
    } else {
        form.submit()
    }
})