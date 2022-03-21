import styleClasses from './Panel.module.scss'
const Panel = ({children, className}) => {
    return (
        <div className={`${styleClasses.panel} ${className}`}>
            {children}
        </div>
    )
}

export default Panel
