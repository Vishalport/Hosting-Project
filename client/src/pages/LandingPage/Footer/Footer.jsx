import './Footer.css'
export default function Footer(){
    return(
        <section className='f-wrapper'>
            <div className="paddings innerWidth flexCenter f-container">
                <div className="flexColStart f-left">
                <h1 className="primaryText">EstateExpress</h1>
                    {/* <img src='./logo2.png' alt='' width={120}/> */}
                    <span className="secondaryText">
                        Our vision is to provide everyone a place <br/>
                        which they can call "Home" at affordable prices
                    </span>
                </div>
                <div className="flexColStart f-right">
                    <span className='primaryText'>Information</span>
                    <span className='secondaryText'>Sector 96, Noida </span>
                </div>
            </div>
        </section>
    )
}