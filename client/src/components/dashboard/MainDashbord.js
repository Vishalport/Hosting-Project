import { useAuth } from "../../context/auth";
import AdminDashboard from "./AdminDashboard";
import SellerDashboard from "./SellerDashboard";
import BuyerDashboard from "./BuyerDashboard";
import { useNavigate } from "react-router-dom";
import AgentDashboard from "./agent/AgentDashboard";
import NavBar from "../navbar/Navbar";
const MainDashboard = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state

  const Navigate = useNavigate();
  const admin = auth.user?.userType?.includes("ADMIN");
  const agent = auth.user?.userType?.includes("AGENT");
  // const seller = auth.user?.userType?.includes("SELLER"); 
  // const seller = auth.user?.userType?.includes("USER"); 

  return (
    <div className="contaienr-fluid mt-3">
      
      {admin ? (
        <div>
          <AdminDashboard />
        </div>
      ) : agent ? (
        <div>
          <AgentDashboard />
        </div>
      ) : (
        <div>
          <BuyerDashboard />
        </div>
      )}
      <hr />
    </div>
  );
};

export default MainDashboard;
