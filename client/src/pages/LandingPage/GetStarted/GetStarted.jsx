import { Link } from 'react-router-dom'
import './GetStarted.css'
export default function GetStarted(){
    return(
        <section className="g-wrapper">
            <div className="paddings innerWidth g-container">
                <div className="flexColCenter inner-container">
                    <span className='primaryText'>Get started with EstateExpress</span>
                    <span className='secondaryText'>With super attractive price quotes
                        <br/>
                        Find your dream place soon!
                    </span>
                    <button className='button'>
                        <Link to={"home"}>Get Started</Link>
                    </button>
                </div>
            </div>
        </section>
    )
}