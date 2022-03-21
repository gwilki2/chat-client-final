import styleClasses from './Select.module.scss'

const Select = ({ children, selectProps, labelText, options, disabledOption}) => {
    return (
        <div className={styleClasses.select}>
            <label htmlFor={selectProps.id}>{labelText}</label>
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
