import styleClasses from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import {faCloud, faClouds} from '@fortawesome/pro-solid-svg-icons'
import gsap from 'gsap'


const AnimatedCloud = ({cloudId }) => {
    
    const animRef = useRef()
    const iconArry = [faCloud, faClouds]


    const [size, setSize] = useState(Math.floor(Math.random() * 5) + 5)
    const [icon, setIcon] = useState(iconArry[Math.floor(Math.random() * 2)])
    const [trigger, setTrigger]= useState(0)

    const runAnim = () => {
        
    }

    useEffect(() => {
        const speedVariance = [1,1,1,1,1.2,1,.9,.8,.7,.6,.5]
        //console.log('running runAnim')
        const width = window.innerWidth
        const height = window.innerHeight
        const animEl = animRef.current
        const selfWidth = animEl.offsetWidth
        const selfHeight = animEl.offsetHeight
        //console.log(width, selfWidth, size, icon.iconName, cloudId)
        
        gsap.set(animEl, {x: -selfWidth, y: (height * gsap.utils.random(.45,1)) - selfHeight})
        gsap.to(animEl, {
            x: width,
            delay: Math.random() * 50,
            duration: 90 * speedVariance[size],
            ease: 'linear',
            onComplete: () => {
                setSize(Math.floor(Math.random() * 5) + 5)
                setIcon(iconArry[Math.floor(Math.random() * 2)])
                setTrigger(prev => ++prev)
            }
        })
        


        //runAnim()
    }, [trigger])
    

    return (
        <div
            ref={animRef}
            className={styleClasses['animated-cloud']}
        >
            <FontAwesomeIcon
                
                icon={icon}
                size={size + 'x'}
            />
        </div>
    )
}

export default AnimatedCloud
