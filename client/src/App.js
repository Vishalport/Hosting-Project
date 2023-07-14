import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/HomePage/Home";
import { AuthProvider, useAuth } from "./context/auth";
import "./App.css";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignUpPage/Signup";
import LandingPage from "./pages/LandingPage/LandingPage";
import PreventRoute from "./helper/PreventRoute";
import OtpVerify from "./pages/SignUpPage/OtpVerify";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import ResetPassword from "./pages/LoginPage/ResetPassword";
import SendOtp from "./pages/LoginPage/SendOtp";
import Verfication from "./pages/LoginPage/Verfication";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import Static from "./components/static/Static";
import SellerDashboard from "./components/dashboard/SellerDashboard";
import Profile from "./pages/Profile/Profile";
import AgentLogin from "./pages/LoginPage/AgentLogin";
import AgentSignup from "./pages/SignUpPage/AgentSignup";
import List from "./pages/List/List";
// import Properties from "./pages/LandingPage/Properties/Properties";
import AdPropertyForm from "./components/dashboard/Forms/AdProperty";
import AdminLogin from "./pages/LoginPage/AdminLogin";
// import AgentDashboard from "./components/dashboard/agent/AgentDashboard";
import MainDashboard from "./components/dashboard/MainDashbord";
import NavBar from "./components/navbar/Navbar";
import ChangePassword from "./components/dashboard/Forms/user/ChangePassword";
import ViewProfile from "./components/Component/ViewProfile";
import Buy from "./pages/SellProperty/Buy";
import Rent from "./pages/RentProperty/Rent";

import Wishlist from "./pages/wishlist/Wishlist";


export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AuthProvider>
        {/* <NavBar />  */}
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Privacy-Notice" element={<Static />} />

          {/* all private routes list */}
            <Route path="/properties/:_id" element={<PropertyPage />} />
          <Route path="/" element={<PreventRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/sellProperty" element={<AdPropertyForm />} />
            <Route path="/Dashboard" element={<MainDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sellProperty" element={<AdPropertyForm />} />
            <Route path="/agentList" element={<List />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/view-profile/:id" element={<ViewProfile />} />
            <Route path="/wishlist" element={<Wishlist />} />

          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/agentlogin" element={<AgentLogin />} />
          <Route path="/send-otp" element={<SendOtp />} />
          <Route path="/verification" element={<Verfication />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/agentsignup" element={<AgentSignup />} />
          <Route path="/otp-verify" element={<OtpVerify />} />
          {/* <Route path="/agentDashboard" element={<AgentDashboard />} /> */}
          {/* <Route path="/mainDashboard" element={<MainDashboard />} />  */}
          


          <Route path="/properties/:_id" element={<PropertyPage />} />
          {/* <Route path="/AdminDashboard" element={<AdminDashboard />} />  */}
          {/* <Route path="/SellerDashboard" element={<SellerDashboard />} />  */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/sellProperty" element={<AdPropertyForm />} />
          <Route path="/agentList" element={<List />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/Rent" element={<Rent />} />

          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
