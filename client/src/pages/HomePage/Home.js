import React, { useState } from "react";
import "./Home.css";
import { useAuth } from "../../context/auth";
import HomepageCard from "../../components/HomePageCard/HomePageCard";
// import image from "../assets/cricket.jpg";
// import properties from './properties.json'
import { useEffect } from "react";
import axios from "axios";
import HomePageCarousel from "../../components/HomePageCarousel/HomePageCarousel";
import SinglePropertyCarousel from '../../components/SinglePropertyCarousel/SinglePropertyCarousel'
import NavBar from "../../components/navbar/Navbar";

export default function Home () {
  //context
  const [auth, setAuth] = useAuth();
  const [props,setProps]=useState([])
  async function getData(){
    try{
      const {data}=await axios.get("http://localhost:8521/api/v1/property/PropertyList")
      const props=data.result
      // console.log("0000000000000000data",props);
         setProps(props)
        // console.log("dsadsadsad",props)
        // console.log(props[0].images);
    }catch(err){
      console.error(err)
    }
  }
  useEffect(()=>{
    try{
        getData()
    }catch(err){
      console.error(err)
    }
  },[])

  // console.log("auth is here on home -->", auth);
  
  return (
    <div className="py-4 px-8 mt-4">
      <NavBar />
      <HomePageCarousel props={props} />
      {/* <div className="home-container">
        <div className="home-content">
          <div className="content-container">
            <h1>Welcome to EstateExpress</h1>
            <p>
              At EstateExpress, we connect buyers, sellers, and renters with
              their dream properties in various cities across India.
            </p>
            <p>
              Our mission is to simplify the real estate process and provide a
              seamless experience for our users. Whether you're looking to buy,
              sell, or rent a property, we've got you covered.
            </p>
            <p>
              With our extensive database of listings, advanced search filters,
              and dedicated team of real estate experts, we ensure that you find
              the perfect property that meets your needs and preferences.
            </p>
            <button className="started-btn">Get Started</button>
          </div>
        </div>
      </div> */}
      <HomepageCard props={props} />
    </div>
  )
}
