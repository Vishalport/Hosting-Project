//this page will be dynamic as it will display single property from the data base
//this page will be dispayed when user clicks on the card present on the homepage
//every card will have a different property and hence every property will have a
//unique key now once the user clicks on the card we will redirect user to the page
//this page will have the _id as params and thus we will grab that by using useParams hook
//now once we will have the id we will send a GET request to our server in useEffect hook
//to get all the data of that partiular place that we can display here
//the dummy data json file we are creating in this directory is what we expect to get as a
//response from our server when we send a GET request to the route lets say ('/properties/propertyID')
//then that response we will be getting will be saved in a state using UseState hook

import { useState, useEffect } from "react";
import singleProperty from "./singleProperty.json";
// import { IoMdPhotos } from "react-icons/io";
// import { AiFillCloseCircle } from "react-icons/ai";
import { IoLocation } from "react-icons/io5";
import { IoBedOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { TbBath } from "react-icons/tb";
import RentSection from "../../components/RentSection/RentSection";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsFillDoorClosedFill } from "react-icons/bs";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { MdOutlinePets } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import { FaSwimmingPool } from "react-icons/fa";
import { BiSolidParking } from "react-icons/bi";
import { BsFillShareFill } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import NavBar from "../../components/navbar/Navbar";
import "./PropertyPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import LikeDislike from "../../components/LikeDislike";
import SinglePropertyCarousel from "../../components/SinglePropertyCarousel/SinglePropertyCarousel";
export default function PropertyPage() {
  //state to show all the photos in the modal
  // const [showAllPhotos, setShowAllPhotos] = useState(false);
  //this state is to handle click on the heart button
  const [property, setProperty] = useState({});
  const params = useParams();
  const [liked, setLiked] = useState(false);
  const [images,setImages]=useState([])

  // const images = [];

  // singleProperty.photos.forEach((photo) => {
  //   let imageObj = {
  //     original: photo,
  //     thumbnail: photo,
  //   };
  //   images.push(imageObj);
  // });

  useEffect(() => {
    if (params?._id) {
      showProperty();
    }
  }, [params?._id]);

  const showProperty = async () => {
    try {
      const { data } = await axios.get(`/property/viewproperty/${params._id}`);
      const info = data.result;
      console.log(info.images)
      setProperty(info);
      // info.images.forEach(element => {
        
      // });
      setImages(info.images)
      console.log("property----------------", info);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(property) 
  // console.log(images)
  // const handelUnLike = async() => {
  //   try {
  //     const {data} = axios.put(`like/addlike${params._id}`, {
  //       headers  : {
  //         token : auth?.token
  //       }
  //     })

  //     setLiked
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const handelLike = async() => {

  // }


  return (
    <div>
      <div className="-mt-10">
        <NavBar />
      </div>
      <div className="bg-gray-100 px-4 py-8 mt-8">
        <div className="flex justify-between">
          <h1 className="text-4xl px-4">{property.name}</h1>
          <div className="flex">
            <div className="pr-10 pt-5">
            <LikeDislike/>
            </div>
            <span className="pr-20 mt-12 pt-1">
              <BsFillShareFill size={25} />{" "}
            </span>
          </div>
        </div>
        <a
          className="anchor mt-3 px-4 flex gap-1 items-center my-2 font-semibold underline"
          target="_blank"
          href={"https://maps.google.com/?q="}
        >
          <IoLocation size={23} /> {property.address}
        </a>
        {/* <div className="pl-52" style={{width:"60rem"}}>
        <ImageGallery items={images} />
        </div>   */}
        {/* <HomePageCarousel property={property} /> */}
        <SinglePropertyCarousel images={images}/>
        {/* <div className="relative">
          <div className="grid gap-2 grid-cols-1 md:grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
              {singleProperty.photos?.[3] && (
                <div>
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="aspect-square object-cover"
                    src={singleProperty.photos[3]}
                    alt="property"
                  />
                </div>
              )}
            </div>
            <div className="grid">
              {singleProperty.photos?.[5] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover"
                  src={singleProperty.photos[5]}
                  alt="property"
                />
              )}
              <div className="border overflow-hidden">
                {singleProperty.photos?.[2] && (
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="aspect-square object-cover relative top-2"
                    src={singleProperty.photos[2]}
                    alt="property"
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex gap-1 items-center absolute right-2 bottom-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
          >
            <IoMdPhotos /> Show More Photos
          </button>
        </div> */}
        <div className="grid grid-cols-[2fr_1fr]">
          <div>
            {/* <div className="my-4 p-4">
              <h2 className="font-bold text-2xl ">Price</h2>
              <p className="leading-7 text-lg mt-4"> {property.price} </p>
            </div> */}
            <div className="my-4 p-4">
              <h2 className="font-bold text-2xl ">Description</h2>
              <p className="leading-7 text-lg mt-4"> {property?.description} </p>
            </div>
          </div>
          <RentSection singleProperty={singleProperty} />
        </div>
        <div className="p-4">
          <h2 className="font-semibold text-2xl mb-2">Amenities </h2>
        </div>
        <div className="p-4 flex w-full justify-evenly">
          <span>
            <IoBedOutline /> Bed
            <br />
            {property?.bedrooms}
          </span>
          <span>
            <BiArea />
            Address <br />
            {property?.address}
          </span>
          <span>
            <TbBath />
            Bath <br />
            {property?.bathrooms}
          </span>
          <span>
            <TbAirConditioning />
            Air conditioning
          </span>
        </div>
        <hr />
        <div className="p-4 flex w-full justify-evenly">
          <span>
            <MdOutlinePets />
            Pet friendly{" "}
          </span>
          <span>
            <GrSecure />
            Security{" "}
          </span>
          <span>
            <FaSwimmingPool />
            Swimming Pool
          </span>
          <span>
            <BiSolidParking />
            Private Parlking
          </span>
        </div>
        <hr />
      </div>
    </div>
  );
}
