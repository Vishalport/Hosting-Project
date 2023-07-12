import React, { useEffect, useState } from "react";
import NavBar from "../navbar/Navbar";
import axios from "axios";
import './static.css';


export default function Static() {

    const [policy, setPolicy] = useState();

    useEffect(() => {
        fetchPolicy();
    }, [])

    const fetchPolicy = async() => {
        const {data} = await axios.get('/statics/staticContentList');
        setPolicy(data.result);
        console.log("--> policy data", data);
    }

    return (
        <div>
            <NavBar />
            <div className="privacy-div">
                {policy?.map((item) => (
                    <div>
                        <h2 className="policy-title mt-2 mb-2">{item?.title}</h2>
                        <hr />
                        <p className="text-muted mt-2 mb-4">{item?.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
