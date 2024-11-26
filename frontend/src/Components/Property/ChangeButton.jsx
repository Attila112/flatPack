import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

function ChangeButton(props) {
    const propertyId = useParams()
    const navigate = useNavigate()
    const fetchDeleteProperty = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/deleteProperty/${propertyId.id}`, {
            method: "DELETE",
        })
        const messages = await response.json()
        console.log(messages.message)
        navigate('/')
    }
    function deletePropertyClick (){
        fetchDeleteProperty()
    }
    return (
        <div>
            <button className={'px-4 py-2 w-32 h-12 m-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'} onClick={deletePropertyClick}>Delete</button>
        </div>
    );
}

export default ChangeButton;