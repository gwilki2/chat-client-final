import styleClasses from './ScreenContainer.module.scss'

const ScreenContainer = ({children, className}) => {
    return (
        <div className={`${styleClasses['screen-container']} ${className}`}>
            <div className={styleClasses['inner-panel']}>
                <div className={styleClasses['inner-inner-panel']}>{children}</div>
            </div>
        </div>
    )
}

export default ScreenContainer
