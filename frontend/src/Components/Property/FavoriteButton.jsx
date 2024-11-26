import React, {useEffect, useState} from 'react';

function FavoriteButton(props) {
    const [favoriteClicked, setFavoriteClicked] = useState(false)
    const token = localStorage.getItem('userToken');

    useEffect(() => {
        const fetchIsItIn = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/favorites/isin', {
                method: "POST",
                headers : {
                    'Authorization': `Bearer ${token}`,
                    "Content-type" : "application/json",
                    'Accept': 'application/json',
                },
                body : JSON.stringify({
                    property_id : props.property_id
                })
            });
            const found = await response.json();
            setFavoriteClicked(found.status)

        }
        fetchIsItIn()
    }, []);
    async function fetchAddFavorites (property_id){
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/favorites`, {
                method: "POST",
                headers : {
                    'Authorization': `Bearer ${token}`,
                    "Content-type" : "application/json",
                    'Accept': 'application/json',
                },
                body : JSON.stringify({
                    property_id : property_id
                })
            });
            // const foundData = await response.json();
        } catch (error) {
            console.error('Error fetching property types:', error);
        }
    }
    async function fetchDeleteFavorites (property_id){
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/favorites/delete`, {
                method: "POST",
                headers : {
                    'Authorization': `Bearer ${token}`,
                    "Content-type" : "application/json",
                    'Accept': 'application/json',
                },
                body : JSON.stringify({
                    property_id : property_id
                })
            });
            // const foundData = await response.json();
        } catch (error) {
            console.error('Error fetching property types:', error);
        }
    }
   async function favoriteChange (){
        if(!favoriteClicked){
           await fetchAddFavorites(props.property_id)
        } else {
          await  fetchDeleteFavorites(props.property_id)
        }
        setFavoriteClicked(!favoriteClicked);

    }

    return (
        <div>
            {favoriteClicked ? <button className={'px-4 py-2 w-32 h-12 m-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'} onClick={favoriteChange}>Delete from favorites</button> :
                <button className={'px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'} onClick={favoriteChange}>Add to favorites</button>}

        </div>
    );
}

export default FavoriteButton;