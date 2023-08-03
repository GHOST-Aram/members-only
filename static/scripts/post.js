const form = document.querySelector('form')

const title = document.querySelector('input')
const titleError = document.querySelector('.title .error')

const message = document.querySelector('textarea')
const messageError = document.querySelector('.message .error')



//Validate title
if(title.validity.valueMissing){
    titleError.textContent = 'Title is a required field.' 
} 
title.addEventListener('input', (event) =>{
    // Check 
    if(title.validity.valid){
        titleError.textContent = ''
    } else {
        
        if(title.validity.patternMismatch){
            titleError.textContent = 'The title may only contain word characters.'
        }
        
        if(title.validity.tooLong){
            titleError.textContent = `Please provide a title of length 
            less than or equal to ${title.maxLength}`
        }
        
        if(title.validity.tooShort){
            titleError.textContent = `Please provide a title of length 
            greater than or equal to ${title.minLength}`
        }
    }
})
//Validate message
if(message.validity.valueMissing){
    messageError.textContent = 'Message is a required field.' 
} 

message.addEventListener('input', (event) =>{
    // Check 
    if(message.validity.valid){
        messageError.textContent = ''
    } else {
        
        if(message.validity.patternMismatch){
            messageError.textContent = 'The message may only contain word characters.'
        }
        
        if(message.validity.tooLong){
            messageError.textContent = `Please provide a message of length 
            less than or equal to ${message.maxLength}`
        }
        
        if(message.validity.tooShort){
            messageError.textContent = `Please provide a message of length 
            greater than or equal to ${message.minLength}`
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