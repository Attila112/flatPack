import React, {useEffect, useState} from 'react';
import PropertyList from "../PropertyList/PropertyList.jsx";

function MyFavorites(props) {
    const [favProperties, setFavProperties] = useState([]);
    const token = localStorage.getItem('userToken');
    useEffect(() => {
        const fetchProperties = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/user/favorites`, {
                method: 'POST',
                headers : {
                    'Authorization': `Bearer ${token}`,
                    "Content-type" : "application/json",
                    'Accept': 'application/json',
                },
            });
            const foundData = await response.json()
            setFavProperties(foundData)
            console.log(foundData)
        }
        fetchProperties()
    }, []);
    return (
        <div>
            <PropertyList properties={favProperties}/>
        </div>
    );
}

export default MyFavorites;