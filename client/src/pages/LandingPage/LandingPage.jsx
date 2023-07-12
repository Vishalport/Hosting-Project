import Header from './Header/Header'
import Hero from './Hero/Hero'
import Properties from './Properties/Properties'
import Value from './Value/Value'
import GetStarted from './GetStarted/GetStarted'
import Contact from './Contact/Contact'
import Footer from './Footer/Footer'
export default function LandingPage(){
    return(
        <div className='App'>
        <div>
        <div className="white-gradient" />
        <Header />
        <Hero />
      </div>
      {/* <Companies/> */}
      <Properties/>
      <Value />
      <Contact />
      <GetStarted />
      <Footer />
        </div>
    )
}