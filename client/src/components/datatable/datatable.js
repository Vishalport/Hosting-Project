import { AiFillEye,AiOutlineCheck } from 'react-icons/ai'
import {ImCross} from 'react-icons/im' ;
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useState } from 'react';
import BasicModal from './BasicModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };  


  
//columns
export const agentColumns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
        field: "user", headerName: "Agent", width: 70 , renderCell: (params) => {
            return (
                <div className="cellWithImage">
                    <img className="cellImg" src={params.row.images} alt='avatar' />
                    {params.row.name}
                </div>
            )
        }
    },
    {
        field: "userName", headerName: "Username", width: 300, renderCell: (params) => {
            return (
                <div>
                    <div>
                        <span className="text-base text-gray-600 font-medium">{params.row.userName}</span>
                    </div>
                    {/* <div>
                        <span className="font-light text-xs text-gray-400">Requested at</span>
                    </div> */}
                    <div>
                        <span className="text-xs text-gray-500">Requested on -</span> <span className="text-l font-medium text-gray-500">{params.row.createdAt}</span>
                    </div>
                </div>
            )
        }
    },
    {
        field: "emailId", headerName: "Email", width: 250, renderCell: (params) => {
            return (
                <div>
                    <span className="align-middle text-l font-medium text-gray-500">{params.row.email}</span>
                </div>
            )
        }
    },
    {
        field: "Status", headerName: "Status", width: 200, renderCell: (params) => {
            return (
                <span className={params.row.isAgent === 'APPROVE' ? "text-lime-500 bg-lime-200 rounded-xl p-1" : params.row.isAgent === 'REJECT' ? "text-red-500 bg-red-100 rounded-xl p-1" : "text-yellow-500 bg-yellow-200 rounded-xl p-1"}>{params.row.isAgent}</span>
            )
        }
    },

    {
        field: 'Action', headerName: "View", width: 70, renderCell: (params) => {
            return (
                <div className="flex">
                    {/* <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full">
                        <AiFillEye/> 
                    </button> */}
                    <BasicModal />
                    {/* <div className='ml-2 mr-2'>
                    <button class="bg-lime-400 hover:bg-lime-500 text-white font-bold py-1 px-1 rounded-full">
                        <AiOutlineCheck/>
                    </button>
                    </div>
                    <button class="bg-red-500 hover:bg-lime-700 text-white font-bold py-1 px-1 rounded-full">
                        <ImCross/>
                    </button> */}
                </div>
            )
        }
    }
]



//Rows
export const agentRows = [
    {
        "id": "1",
        "name": "Vishal",
        "date": "12/3/2023",
        "images": "https://images.pexels.com/photos/7647381/pexels-photo-7647381.jpeg?auto=compress&cs=tinysrgb&w=600",
        "userName": "viz",
        "emailId": "viz@wiz.com",
        "Status": "Approved",

    },
    {
        "id": "2",
        "name": "Priyanshu",
        "date": "2/4/2023",
        "images": "https://images.pexels.com/photos/7647381/pexels-photo-7647381.jpeg?auto=compress&cs=tinysrgb&w=600",
        "userName": "ryan",
        "emailId": "ryan@yawn.com",
        "Status": "Rejected"
    },
    {
        "id": 3,
        "name": "Aman",
        "date": "22/5/2023",
        "images": "https://images.pexels.com/photos/7647381/pexels-photo-7647381.jpeg?auto=compress&cs=tinysrgb&w=600",
        "userName": "naman",
        "emailId": "amaan@man.com",
        "Status": "Pending"
    },
    {
        "id": 4,
        "name": "Prateek",
        "date": "4/1/2023",
        "images": "https://images.pexels.com/photos/7647381/pexels-photo-7647381.jpeg?auto=compress&cs=tinysrgb&w=600",
        "userName": "pretick",
        "emailId": "pretick@tick.com",
        "Status": "Approved"
    }
]