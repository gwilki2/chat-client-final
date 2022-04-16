import styleClasses from './Input.module.scss'

const Input = ({inputProps = {}, labelText, className='', isTextarea, hasError, indicateRequired=false}) => {
    return (
        <div className={`${styleClasses.input} ${className} ${hasError ? styleClasses.error: ''}`}>
            <div><label htmlFor={inputProps.id}>{labelText}</label>{indicateRequired && <span style={{ color: 'red' }}>*</span>}</div>
            {isTextarea ? <textarea {...inputProps} /> : <input {...inputProps} />}
        </div>
    )
}

export default Input
