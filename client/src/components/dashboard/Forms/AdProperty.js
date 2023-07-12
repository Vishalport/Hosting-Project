import React, { useState } from "react";

import "./AdProperty.css";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { RingLoader } from "react-spinners";
import NavBar from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";


const AdPropertyForm = () => {
  //context
  const [auth, setAuth] = useAuth();

  //hooks
  const navigate = useNavigate()
  const [loading,setloading] = useState(false)
  const [property, setProperty] = useState({
    name: "",

    address: "",

    price: "",

    bedrooms: "",
    bathrooms: "",

    carpark: "",

    size: "",

    action: "",

    floor: "",
    type: "",
    description:"",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProperty((prevProperty) => ({
      ...prevProperty,

      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    // const files = Array.from(e.target.files);
    setloading(true)
    const file = e.target.files;
    try {
      const imageUrl = await axios.post("/file/uploadMultipulFiles", file);
      console.log(imageUrl?.data?.result);
      setProperty((prevProperty) => ({
        ...prevProperty,

        images: imageUrl?.data?.result,
      }));
      toast.success("image uploded!");
      setloading(false)
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
setloading(true);
    try {
      const formData = axios.post("/property/addNewProperty", property, {
        headers: {
          token: auth?.token,
        },
      });
      console.log(">>>>>>form data", formData);
      toast.success("property added");
      setloading(false)
      navigate('/home')
    } catch (err) {
      console.log(err);
      toast.error(err);
      setloading(false)
    }
    console.log(property);

    setProperty({
      name: "",
      address: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      carpark: "",
      size: "",
      action: "",
      type: "",
      floor: "",
      images: "",
      description:"",
    });
  };

  return (
    <>
    <NavBar/>
    <div className="container container123">
      <div className="card123 card">
        <div className="card-header card-header123">Property Details</div>

        <div className="card-body card-body123">
          <form onSubmit={handleSubmit} className="form form123">
            <div className="form-group form-group123">
              <label>Property Name:</label>

              <input
                type="text"
                name="name"
                value={property.name}
                onChange={handleChange}
                className="form-control form-control123"
                required
              />
            </div>

            <div className="form-group form-group123">
              <label>Property Address:</label>

              <input
                type="text"
                name="address"
                value={property.address}
                onChange={handleChange}
                className="form-control form-control123"
                required
              />
            </div>

            <div className="form-group form-group123">
              <label>Property Price:</label>

              <input
                type="text"
                name="price"
                value={property.price}
                onChange={handleChange}
                className="form-control form-control123"
                required
              />
            </div>

            <div className="form-group form-group123">
              <label>On which Floor:</label>

              <input
                type="number"
                name="floor"
                value={property.floor}
                onChange={handleChange}
                className="form-control form-control123"
                min={1}
                required
              />
            </div>

            <div className="form-group form-group123">
              <label>Number of Bedrooms:</label>

              <input
                type="number"
                name="bedrooms"
                value={property.bedrooms}
                onChange={handleChange}
                className="form-control form-control123"
                required
                min={1}
              />
            </div>

            <div className="form-group form-group123">
              <label>Number of Bathrooms:</label>

              <input
                type="number"
                name="bathrooms"
                value={property.bathrooms}
                onChange={handleChange}
                className="form-control form-control123"
                required
                min={1}
              />
            </div>

            <div className="form-group form-group123">
              <label>Car Park:</label>

              <select
                type="number"
                name="carpark" // Update the name attribute to "carpark"
                value={property.carpark}
                onChange={handleChange}
                className="form-control form-control123"
                required
              >
                <option value="">Is Car Park?</option>
                <option value="yes">YES</option>
                <option value="no">NO</option>
              </select>
            </div>

            <div className="form-group form-group123">
              <label>Land Size (BHK):</label>

              <select
                name="size"
                value={property.size}
                onChange={handleChange}
                className="form-control form-control123"
                required
                min={0}
              >
                <option value="">Select Land Size</option>

                <option value="1BHK">1 BHK</option>

                <option value="2BHK">2 BHK</option>

                <option value="3BHK">3 BHK</option>

                <option value="4BHK">4 BHK</option>
              </select>
            </div>

            <div className="form-group form-group123">
              <label>Action:</label>

              <select
                name="action"
                value={property.action}
                onChange={handleChange}
                className="form-control form-control123"
                required
              >
                <option value="">Select Action</option>

                <option value="BACHELOR">Bachelor</option>

                <option value="FAMILY">Family</option>

                <option value="PARTY">Party</option>

                <option value="BACHELOR OR FAMILY">Bachelor or Family</option>
              </select>
            </div>

            <div className="form-group form-group123">
              <label>Type:</label>

              <select
                name="type"
                value={property.type}
                onChange={handleChange}
                className="form-control form-control123"
                required
              >
                <option value="">Select Type</option>

                <option value="SELL">For Sell</option>

                <option value="RENT">For Rent</option>
              </select>
            </div>

            <div className="form-group form-group123">
            <label> Proeprty Description:</label>
             <textarea 
             name="description"
             value={property.description}
             onChange={handleChange}
             className="form-control form-control123"
             required
             ></textarea>
            </div>

            <div className="form-group form-group123">
              <label>Upload Property Images:</label>

              <input
                type="file"
                name="images"
                onChange={handleImageUpload}
                className="form-control form-control123"
                multiple
                required
              />
            </div>

            <button
            type="submit"
            className="btn-primary-form rounded-2xl mt-4"
            disabled={loading}
          >
            {loading ? (
             "loading..."
            ) : (
              "Add Property"
            )}
          </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdPropertyForm;
