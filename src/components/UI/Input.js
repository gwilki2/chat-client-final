import styleClasses from './Input.module.scss'

const Input = ({inputProps = {}, labelText, className='', isTextarea, hasError}) => {
    return (
        <div className={`${styleClasses.input} ${className} ${hasError ? styleClasses.error: ''}`}>
            <label htmlFor={inputProps.id}>{labelText}</label>
            {isTextarea ? <textarea {...inputProps} /> : <input {...inputProps} />}
        </div>
    )
}

export default Input
