import './Hero.css'
import CountUp from 'react-countup'
import{HiLocationMarker} from 'react-icons/hi'
import {motion, spring} from 'framer-motion'
export default function Hero(){
    return(
        <section className="hero-wrapper">
            <div className="paddings innerWidth flexCenter hero-container">
                <div className="flexColStart hero-left">
                    <div className='hero-title'>
                        <motion.h1
                        initial={{y:'2rem',opacity:0}}
                        animate={{y:0,opacity:1}}
                        transition={{
                            duration:2,
                            type:spring,
                        }}
                        >
                            Discover <br/>The property<br/> That suites you.
                        </motion.h1>
                    </div>
                    <div className='flexColStart hero-des'>
                        <span className='secondaryText'>Find variety of property that suites you</span>
                        <span className='secondaryText'>Forget all difficulties in finding a residence for you</span>
                    </div>
                        <div className="flexCenter search-bar">
                            <HiLocationMarker color='var(--blue)' size={25}/>
                            <input type='text' />
                            <button className="button">Search</button>
                    </div>
                    <div className="flexCenter stats">
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={20} end={100} duration={4}/>
                                <span>+</span>
                            </span>
                            <span className='secondaryText'>Offline Centers</span>
                        </div>
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={500} end={1000} duration={4}/>
                                <span>+</span>
                            </span>
                            <span className='secondaryText'>Happy Customers</span>
                        </div>
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp end={28}/>
                                <span>+</span>
                            </span>
                            <span className='secondaryText'>Services</span>
                        </div>
                    </div>
                </div>
                
                <div className="flexCenter hero-right">
                    <motion.div
                    initial={{x:'7rem',opacity:0}}
                    animate={{x:0,opacity:1}}
                    transition={{
                        duration:2,
                        type:'spring',
                    }}
                    className="image-container">
                        <img src='./hero-image.jpg' alt='hero' />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}