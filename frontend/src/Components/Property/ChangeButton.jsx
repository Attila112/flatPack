import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

function ChangeButton(props) {
    const propertyId = useParams()
    const navigate = useNavigate()
    const fetchDeleteProperty = async () => {
        console.log(propertyId.id)
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
            <button className={'button'} onClick={deletePropertyClick}>Delete</button>
            <button className={'button'}>Update</button>
        </div>
    );
}

export default ChangeButton;