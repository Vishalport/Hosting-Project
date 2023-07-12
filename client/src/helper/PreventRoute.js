import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";
import RedirectRoute from './RedirectRoute'


const PreventRoute = () => {
    //context
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    useEffect(()=>{
        if(auth?.token) getCurrentUser();
        console.log(auth)
    }, [auth?.token]);

    const getCurrentUser = async () => {
        try{
            const {data} = await axios.get('/user/getProfile');
            setOk(true);
            console.log("user details  ---> ", data);
        }catch(err){
            setOk(false);
        }
    }
    return ok ? <Outlet /> : <RedirectRoute/>;                                           
}
 
export default PreventRoute;