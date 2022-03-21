import { useState } from "react"
import validate from "../validators"

//name:string, initVal:string, validationFns:array of {name, [params]}, specialFormattingFn:func(val)
const useMyValidation = (name, initVal, validationFns, specialFormattingFn) => {

    const [value, setValue] = useState(initVal)
    const [isTouched, setIsTouched] = useState(false)
    const [isValid, setIsValid] = useState(false)

    const [errors, setErrors] = useState([])



    const onChange = (newValue) => {
        setValue(prev => {
            if (specialFormattingFn) return specialFormattingFn(newValue)
            return newValue
        })
        
        setErrors([])
        validationFns.forEach(valFn => {
            if (!validate[valFn.name](newValue, ...valFn.params)) {
                setIsValid(false)
                setErrors(prev => [...prev, valFn.name])
            }
        })

        if(!errors.length) setIsValid(true)
    }
    const onBlur = (value) => {
        if (value) return setIsTouched(true)
        return setIsTouched(false)
    }



    return {
        name, 
        isTouched, 
        onChange, 
        value, 
        isValid, 
        errors, 
        onBlur, 
        hasErrorAfterTouch: isTouched && !!errors.length
    }
}

export default useMyValidation