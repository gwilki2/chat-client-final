//Validators should return true if the value is valid

const isNotEmpty = (value) => {
    console.log(!!value.trim())
    return !!value.trim()
}

const isEmail = (value) => {
    console.log(value)
    return value.includes('@') && value.includes('.')
}

const hasMinChars = (value, num) => {
    return value.length >= num
}

const validators = {
    isNotEmpty, 
    isEmail, 
    hasMinChars
}

export const fnNames = {
    'isNotEmpty': 'isNotEmpty', 
    'isEmail': 'isEmail', 
    'hasMinChars': 'hasMinChars'
}

export default validators