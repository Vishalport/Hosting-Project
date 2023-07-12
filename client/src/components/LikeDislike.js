import React, { useState, useEffect } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

export default function LikeDislike({ card }) {
  const [auth, setAuth] = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [like, setLike] = useState(false);

  useEffect(() => {
    const localStorageWishlist = localStorage.getItem('auth.user.wishlist');
    if (localStorageWishlist) {
      const wishlist = JSON.parse(localStorageWishlist);
      setLike(wishlist.includes(params._id));
    }
  }, [params._id]);

  const handleLike = async () => {
    try {
      if (!auth.user) {
        toast.error('Please log in first.');
        navigate('/login');
        return;
      }

      await axios.post(`wishList/addWishList/${params._id}`, {}, {
        headers: {
          token: auth.token
        }
      });

      toast.success('Liked successfully');
      setLike(true);

      // Update auth.user.wishlist in local storage
      const localStorageWishlist = localStorage.getItem('auth.user.wishlist');
      if (localStorageWishlist) {
        const wishlist = JSON.parse(localStorageWishlist);
        wishlist.push(params._id);
        localStorage.setItem('auth.user.wishlist', JSON.stringify(wishlist));
      } else {
        localStorage.setItem('auth.user.wishlist', JSON.stringify([params._id]));
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    }
  };

  const handleUnlike = async () => {
    try {
      if (!auth.user) {
        toast.error('Please log in first.');
        navigate('/login');
        return;
      }

      await axios.post(`wishList/removeWishList/${params._id}`, {}, {
        headers: {
          token: auth.token
        }
      });

      toast.success('Unliked successfully');
      setLike(false);

      // Update auth.user.wishlist in local storage
      const localStorageWishlist = localStorage.getItem('auth.user.wishlist');
      if (localStorageWishlist) {
        const wishlist = JSON.parse(localStorageWishlist);
        const updatedWishlist = wishlist.filter(id => id !== params._id);
        localStorage.setItem('auth.user.wishlist', JSON.stringify(updatedWishlist));
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <>
      {auth.user === null ? (
        <span>
          <FcLikePlaceholder onClick={() => navigate('/login')} className="h2 pointer" />
        </span>
      ) : (
        like ? (
          <span>
            <FcLike onClick={handleUnlike} className="h2 pointer" />
          </span>
        ) : (
          <span>
            <FcLikePlaceholder onClick={handleLike} className="h2 pointer" />
          </span>
        )
      )}
    </>
  );
}
