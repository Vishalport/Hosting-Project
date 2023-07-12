import React, { useState, useEffect } from "react";
import "./RentSection.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Toast from "react-hot-toast";
import axios from "axios";
import { USER } from "../../config/config";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 450,
  borderRadius: 4,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  pt: 4,
  px: 6,
  pb: 4,
};

// import { differenceInCalendarDays } from "date-fns";
export default function RentSection({ singleProperty }) {
  const [auth, setAuth] = useAuth();

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isDisabled, setDisabled] = useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const checkLoginIn = auth?.userResult !== null && auth?.token !== "";

  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleOpen();
    try {
      const { data } = await axios.post(
        `${USER}/requestForAent/${params._id}`,
        {
          message,
          name,
          mobileNumber,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      console.log("---------------- request data -------------------", { data });
      if (data?.error) {
        Toast.error(data?.error);
      } else {
        // Toast.success("Thank You Agent will connect you");
        console.log("Thank You Agent will connect you");
        setName("");
        setMobileNumber("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
      Toast.error("Something went Worng");
    }
  };
//   function disable() {
//     if(message && name && mobileNumber){
//       disabled={false}
//     }
//     document.getElementById("one").disabled = true;
// }
// function enable()
// { document.getElementById("two").disabled = false; }

  return (
    <div className="bg-white shadow p-4 mt-9 rounded-2xl">
      <div className="text-2xl text-center">Message enquiry</div>
      <form onSubmit={handleSubmit}>
        <div className="border rounded-2xl mt-4">
          <div className="flex"></div>
          <div>
            <div className="py-3 px-4 border-l">
              <label>Your name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border my-1 py-2 px-3 rounded full"
                type="text"
              />
              <label>Your Mobile number</label>
              <input
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full border my-1 py-2 px-3 rounded full"
                type="tel"
              />
              <label>Message</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border my-1 py-2 px-3 rounded full"
                type="text"
              />
            </div>
          </div>
        </div>
        {message && name && mobileNumber ? (
          <button
            className="bg-blue-700 mt-4 rounded-2xl p-2 text-white w-full"
            disabled={!checkLoginIn}
          >
            Request Visit{" "}
          </button>
        ) : (
          <button
            className="bg-blue-700 mt-4 rounded-2xl p-2 text-white w-full"
          >
            {" "}
            Request Visit{" "}
          </button>
        )}{" "}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box className="ImageSSS">
              {/* <img src="https://img.uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/success-green-check-mark-icon.svg" /> */}
            </Box>
            <br />
            <br />
            <hr />
            <Box className="Center">
              <Typography id="modal-modal-enquiry" variant="h6" component="h2">
                Thank you for your enquiry,{name}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Your enquiry for{singleProperty.title} has been sent to DiJones
                - Neutral Bay . If you don’t hear back within 48 hours,please
                contact them directly.
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Want us to remember your details in the future?
              </Typography>
              <Typography id="modal-modal-login" sx={{ mt: 2 }}>
                Please Add property in wishlist and we’ll remember your details
                when you enquire. That way, you can breeze right through your
                future enquiries.
              </Typography>
            </Box>
          </Box>
        </Modal>
      </form>
    </div>
  );
}
