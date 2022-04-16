import styleClasses from './Select.module.scss'

const Select = ({ children, selectProps, labelText, options, disabledOption, indicateRequired=false}) => {
    return (
        <div className={styleClasses.select}>
            <div><label htmlFor={selectProps.id}>{labelText}</label>{indicateRequired && <span style={{ color: 'red' }}>*</span>}</div>
            <select {...selectProps}>
                {
                    options.map((opt, i) => <option
                        value={opt.value}
                        key={i}
                        disabled={opt.value===disabledOption}
                    >{opt.label}</option>)
                }
            </select>
        </div>
    )
}

export default Select
