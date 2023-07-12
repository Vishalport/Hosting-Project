import "./Properties.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../utils/common";
import { useEffect,useState } from "react";
import axios from "axios";
export default function Properties() {
  const [properties,setProperties]=useState([])

  async function getProperties(){
    try{
      const {data}=await axios.get('http://localhost:8521/api/v1/property/PropertyList')
      // console.log("NSDJFJAJFSAJFJSA",data.result)
      setProperties(data.result)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    getProperties()
  },[])
  
  return (
    <section id='Properties' className="r-wrappper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Properties</span>
        </div>
        <Swiper {...sliderSettings}>
          <SliderButtons />
          {properties.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card">
                <img src={card?.images[0]?.url} className="aspect-square object-cover rounded-2xl" alt="home" />
                <span className="secondaryText r-price">
                  <span style={{ color: "orange" }}>₹</span>
                  <span>{card.price}</span>
                </span>
                <span className="primaryText">{card.name}</span>
                <span className="secondaryText">{card.address}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={()=>swiper.slidePrev()}>&lt;</button>
      <button onClick={()=>swiper.slideNext()}>&gt;</button>
    </div>
  );
};
