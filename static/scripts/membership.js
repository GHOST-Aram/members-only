const form = document.querySelector('form')
const textbox = document.querySelector('input')
const error = document.querySelector('.error')


textbox.addEventListener('input', (event) =>{
    // Check 
    if(textbox.validity.valid){
        error.textContent = ''
    } else {
        
        if(textbox.validity.patternMismatch){
            error.textContent = 'The code can only have letter characters.'
        }
        
        if(textbox.validity.tooLong){
            error.textContent = `Please provide a code of length 
            less than or equal to ${textbox.maxLength}`
        }
        
        if(textbox.validity.tooShort){
            error.textContent = `Please provide a code of length 
            greater than or equal to ${textbox.minLength}`
        }
        
        if(textbox.validity.valueMissing){
            error.textContent = 'This is a required field. You cannot leave it blank.' 
        } 
    }
})

form.addEventListener('submit', event =>{
    if(form.checkValidity()){
        form.submit()
    } else {
        event.preventDefault()
    }
})