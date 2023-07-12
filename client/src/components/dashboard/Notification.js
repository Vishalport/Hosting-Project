import React, { useState } from 'react';
import './Notification.css';
import UserRequest from './UserRequest';
import List from '../../pages/List/List';

export default function Notification() {

    //use State
    const [click, setClick] = useState(true);
    const [btn1, setBtn1] = useState(true);
    const [btn2, setBtn2] = useState(true);

  return (
    <div>
        <div className='mb-4'>
            <button className={`btn mt-2 button_dash`} onClick={e=> setClick(false)}>Pending Agent</button>
            <button className={`btn mt-2 ml-2 button_dash`} onClick={e=> setClick(true)}>User Request</button>
        </div>
        {click ? <UserRequest /> : <List />}
    </div>
  )
}
