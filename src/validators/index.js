//Validators should return true if the value is valid
import validator from 'validator'


const isNotEmpty = value => !validator.isEmpty(value, {ignore_whitespace:true})

const isEmail = value => validator.isEmail(value)

const hasMinChars = (value, num) => {
    return value.length >= num
}

const minCharsWhenFilled = (value, num) => {
    if (isNotEmpty(value)) return hasMinChars(value, num)
    return true
}

const validators = {
    isNotEmpty, 
    isEmail, 
    hasMinChars, 
    minCharsWhenFilled
}

export const fnNames = {
    'isNotEmpty': 'isNotEmpty', 
    'isEmail': 'isEmail', 
    'hasMinChars': 'hasMinChars', 
    'minCharsWhenFilled': 'minCharsWhenFilled'
}

export default validators