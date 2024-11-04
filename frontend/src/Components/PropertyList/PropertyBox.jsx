import React, { useEffect, useState } from 'react';

function PropertyBox(props) {
    const [img, setImg] = useState('https://kep.cdn.indexvas.hu/1/0/2098/20980/209807/20980782_1335884_a378a0520a6450953bd777efc34d0fe3_wm.jpg');
    const [loading, setLoading] = useState(false); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

     const imgUrl = async () => {
         // try {
         // setImg('https://kep.cdn.indexvas.hu/1/0/2098/20980/209807/20980782_1335884_a378a0520a6450953bd777efc34d0fe3_wm.jpg')
         const response = await fetch(`http://127.0.0.1:8000/api/image/${props.id}`);

             const data = await response.json();
         if (response.ok && data.success) {
                setImg(`http://localhost:8000/${data.image}`);
            }

         // } catch (err) {
         //     setImg('https://kep.cdn.indexvas.hu/1/0/2098/20980/209807/20980782_1335884_a378a0520a6450953bd777efc34d0fe3_wm.jpg')
         //     setError('Error fetching image');
         // } finally {
             setLoading(false);
         // }
     };

     useEffect(() => {
         imgUrl();
     }, []);

    return (
        <div className={'block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white'} key={props.uniqueKey}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <img src={img} alt="Property" className={'rounded-t-lg'} />
            )}
            <div className={'p-6'}>

                <h3>Address: {props.address}</h3>
                <h3>Rooms: {props.rooms}</h3>
                <h3>Price: {props.price}</h3>
                <h3>Size: {props.size}</h3>
            </div>
        </div>
    );
}

export default PropertyBox;
