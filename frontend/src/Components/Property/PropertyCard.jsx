import React, {useEffect, useState} from 'react';
import Loading from "../MainPage/Loading.jsx";
import {useParams} from "react-router-dom";
import FavoriteButton from "./FavoriteButton.jsx";
import ChangeButton from "./ChangeButton.jsx";
import {CarouselCustomNavigation} from "./CarouselCustomNavigation.jsx";
import UserCard from "../User/UserCard.jsx";

function PropertyCard() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [owner, setOwner] = useState(null)
    const propertyId = useParams().id
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const propertyPromise = await fetch(`http://127.0.0.1:8000/api/property/${id}`)
                const propertyData = await propertyPromise.json();
                await setProperty(propertyData.property);

                const ownerPromise = await fetch(`http://127.0.0.1:8000/api/owner/${propertyData.property['user_id']}`)
                const ownerData = await ownerPromise.json();
                await setOwner(ownerData.user);

                if (property){
                    const userResponse = await fetch(`http://127.0.0.1:8000/api/owner/${foundData.property['user_id']}`);
                    const user = await userResponse.json();
                    user.user !== null ? setOwner(user.user) : setOwner("N/A");
                }
            } catch (error) {
                console.error('Error fetching property types:', error);
            }
        };

        fetchProperty();
    }, []);


    function currencyFormat(num) {
        return '' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    function checkOwnerIsLogIn (){
        const userId = localStorage.getItem('userId')
        if (owner){
            return owner.id == userId;
        } else {
            return false
        }

    }

    if (!property) {
        return <Loading/>
    } else {
        return (
            <div className={"property-card"}>
                <div className={"grid gap-4 grid-cols-3 grid-rows-3 Property-headline font-serif"}>
                    <div className={"row-span-3 col-span-2 property-images apply-square-background flex flex-col items-center"}>
                        <h1 className="text-center mb-4 text-2xl">Property images</h1>
                        <div className="flex items-center justify-center w-full h-full" >
                            <CarouselCustomNavigation/>
                        </div>
                    </div>
                    <div className={"row-span-2 property-quick-data apply-square-background text-3xl grid grid-cols-1 "}>
                        <div>
                            <label className={"font-bold"}>Title:</label>
                                <h1>{property.title}</h1>
                        </div>
                        <div>
                            <label className={"font-bold"}>Description:</label>
                            <h1>{property.description}</h1>
                        </div>
                        <div>
                            <label className={"font-bold"}> Price:</label>
                                <h1>{currencyFormat(property.price)} $</h1>
                        </div>
                        <div>
                            <label className={"font-bold"}>Size:
                                <h1>{property.size} m2</h1>
                            </label>
                        </div>

                    </div>
                    <div className={"property-quick-actions apply-square-background flex-auto gap-3 "}>
                        <button className={"px-4 py-2 w-32 h-12 text-sm m-2 rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"}>Buy</button>
                        {localStorage.getItem('userToken') ? <FavoriteButton property_id={propertyId}/> : ""}
                        {checkOwnerIsLogIn(owner) ? <ChangeButton/> : "" }

                    </div>
                    <div className={"col-span-2 property-data apply-square-background text-xl"}>
                        <h1>Property data</h1>
                        <table className={"table-auto property-data-table border-2 border-black p-28"}>
                            <tbody className={"border-2 border-black p-64"}>
                            <tr className={"border-2 border-black p-28"}>
                                <th className={"border-2 border-black"}>Address</th>
                                <td className={"border-2 border-black"}>{property.city} {property.street} {property.house_number}</td>
                            </tr>
                            <tr className={"border-2 border-black"}>
                                <th className={"border-2 border-black"}>Size</th>
                                <td>{property.size} m2</td>
                            </tr>
                            <tr className={"border-2 border-black"}>
                                <th className={"border-2 border-black"}>Rooms</th>
                                <td>{property.rooms}</td>
                            </tr>
                            <tr className={"border-2 border-black"}>
                                <th className={"border-2 border-black"}>Bathrooms</th>
                                <td>{property.bathroom_count}</td>
                            </tr>
                            <tr className={"border-2 border-black"}>
                                <th className={"border-2 border-black"}>Stories</th>
                                <td>{property.floor}</td>
                            </tr>
                            <tr className={"border-2 border-black"}>
                                <th className={"border-2 border-black"}>Build material</th>
                                <td>{property.building_material}</td>
                            </tr>
                            <tr className={"border-2 border-black"}>
                                <th className={"border-2 border-black"}>Type</th>
                                <td>{property.type}</td>
                            </tr>
                            <tr className={"border-2 border-black"}>
                                <th className={"border-2 border-black"}>Plot size</th>
                                <td>{property.plot_size}</td>
                            </tr>
                            <tr className={"border-2 border-black"}>
                                <th className={"border-2 border-black"}>Garages</th>
                                <td>{property.garage}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    {owner ? <UserCard name={owner['name']} email={owner['email']}/>
                        // <div className={"col-span-1 property-owner apply-square-background"}>
                        //     <h1>Property owner</h1>
                        //     <h1>{owner['name']}</h1>
                        //     <h1>{owner['email']}</h1>
                        // </div>
                        :
                        <div className={"col-span-1 property-owner apply-square-background"}>
                            <h1>Property owner</h1>
                            <h1>Failed to fetch owner</h1>
                        </div>
                    }
                </div>
            </div>

        );
    }
}

export default PropertyCard;