import React, { useState, useEffect } from "react";
import "./Rent.css"
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import HomepageCard from "../../components/HomePageCard/HomePageCard";
import NavBar from "../../components/navbar/Navbar";


export default function Rent() {
  const [auth, setAuth] = useAuth();

  const [RentCard, setRentCard] = useState([]);

  useEffect(() => {
    fetchSellCard();
  }, []);

  const fetchSellCard = async () => {
    try {
      const { data } = await axios.get(`/property/ListRentProperty`);
      console.log("........", data.result);
      setRentCard(data.result);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("jdsfhudsgfudsbf", RentCard);

  return (
    <div>
    <div className="mt-15">
      <NavBar />
    </div>
    <div className="ContainerConnectImg">
        <h1 className="Homess">Search properties for Rent</h1>
      <img className="Imagessajd" src="https://argonaut.au.reastatic.net/resi-property/prod/homepage-web/web_lrg-59e123c20c1b8a953941.webp"></img>
      </div>
    <div className="mt-12 pt-4 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-5 lg-grid-cols-4 p-3">
    {RentCard.length > 0 &&
      RentCard.map((prop,index) => (
        <div key={index} className="transform transition duration-200 hover:scale-105">
          <Link to={`/properties/${prop._id}`}>
          <div className="bg-gray-500 mb-2 rounded-2xl">
            {prop.images && (
              <img
                className="rounded-2xl object-cover aspect-square"
                src={prop?.images[0]?.url}
                alt="property"
              />
              )}
          </div>
          <h2 className="font-bold">{prop.address}</h2>
          <h3 className="text-sm text-gray-500">{prop.name}</h3>
          <div className="mt-1">₹{prop.price}</div>
        </Link>
        </div>
      ))}
  </div>
  </div>
  );
}
