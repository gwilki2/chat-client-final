import styledClasses from './FormButton.module.scss'

const FormButton = ({buttonProps={}, children, color='black', backgroundColor='white', isBright=true}) => {
    return (
        <div className={styledClasses['form-button']}>
            <button
                className={`${isBright ? styledClasses.bright : styledClasses.dark} ${buttonProps.disabled ? styledClasses.dis : ''}`}
                {...buttonProps}
                style={{ backgroundColor, color }}
            >
                {children}
            </button>
        </div>
    )
}

export default FormButton
