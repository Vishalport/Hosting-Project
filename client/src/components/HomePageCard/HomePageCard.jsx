import { Link } from "react-router-dom";
import './HomeCard.css';

export default function HomepageCard({props}) {
    //here the propertyId will be the uniqueID present for every property in the database
    //we will get that _id from the database by fetching the data of all the properties from
    //database using useEffect hook and sending a GET request to our server 
    //the response that we will get from the server will most probably will be an array 
    //of objects that we will set here to our state varible using useState hook
    //then we will be redirected to the PropertyPage.jsx
  return (
    <div className="mt-8 pt-4 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-5 lg-grid-cols-4 grid-divs">
      {props.length > 0 &&
        props.map((prop,index) => (
          <div key={index} className="transform transition duration-200 hover:scale-105 div-card-size">
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
  );
}
