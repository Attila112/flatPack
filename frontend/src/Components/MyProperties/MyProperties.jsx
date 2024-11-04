import React, {useEffect, useState} from 'react';
import PropertyList from "../PropertyList/PropertyList.jsx";

function MyProperties() {
    const [myProperties, setMyProperties] = useState([]);
    const token = localStorage.getItem('userToken')
    useEffect(() => {
        const fetchMyProperties = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/properties/myproperties', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-type": "application/json",
                    'Accept': 'application/json',
                }
            });
            if (response.ok){
                const foundData = await response.json();
                console.log(foundData)
                setMyProperties(foundData.properties)
            }
            else{
                return (
                    <h1>You dont have any properties yet!</h1>
                )
            }
        }
        fetchMyProperties()
    }, [token]);
    return (
        <div>
            <PropertyList properties={myProperties}/>
        </div>
    );
}

export default MyProperties;