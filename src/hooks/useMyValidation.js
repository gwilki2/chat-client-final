import { useEffect, useState } from "react"
import validate from "../validators"

//name:string, initVal:string, validationFns:array of {name, [params]}, specialFormattingFn:func(val)
const useMyValidation = ({ name, initVal, validationFns, checkOnInit = false, specialFormattingFn }) => {

    const [value, setValue] = useState(initVal)
    const [isTouched, setIsTouched] = useState(false)
    const [isValid, setIsValid] = useState(false)

    const [errors, setErrors] = useState([])

    const onChange = (newValue) => {

        const errList = []
        let finalIsValid = true

        setValue(prev => {
            if (specialFormattingFn) return specialFormattingFn(newValue)
            return newValue
        })
        
        validationFns.forEach(valFn => {
            console.log('running valFn:', valFn.name, 'for', newValue)
            if (!validate[valFn.name](newValue, ...valFn.params)) {
                finalIsValid = false
                errList.push(valFn.name)
            }
        })

        setErrors([...errList])
        setIsValid(finalIsValid)
    }
    const onBlur = (value) => {
        if (value) return setIsTouched(true)
        return setIsTouched(false)
    }

    const clear = () => {
        setValue('')
    }

    const reset = () => {
        setValue(initVal)
        setIsTouched(false)
        setIsValid(false)
        setErrors([])
    }

    useEffect(() => {
        if (checkOnInit) {
        console.log('running check on init for ', name)
        onChange(value)
    }
    }, [])
    

    console.log('running useMyValidation', name, value)
    return {
        name, 
        isTouched, 
        onChange, 
        value, 
        isValid, 
        errors, 
        onBlur, 
        hasErrorAfterTouch: isTouched && !!errors.length, 
        clear, 
        reset
    }
}

export default useMyValidation