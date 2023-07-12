import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import WishlistCard from "./WishlistCard";
import axios from "axios";
import NavBar from "../../components/navbar/Navbar";
import "./Wishlist.css";

const Wishlist = () => {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [wishlist, setWishlist] = useState([{}]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("/wishList/List");
        const wishlistItems = response.data.result;
        console.log(wishlistItems, "wishlist items");

        const updatedWishlist = wishlistItems.map((item) => ({
          image: item.images[0].url,
          name: item.name,
          description: item.description,
          id: item._id,
        }));
        console.log(updatedWishlist, ">>>>>wishlist objects");
        setWishlist(updatedWishlist);
        console.log(wishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <>
      <NavBar />
      <div className="wishlist-container">
        <h2 className="wishlist-heading">Your Wishlist</h2>

        <div className="wishlist-items ">
          {wishlist.map((item, index) => (
            
              <WishlistCard key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
