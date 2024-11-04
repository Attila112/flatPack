import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function ImageGallery(props) {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const propertyId = useParams()
    const [currentImage, setCurrentImage] = useState(null)


    useEffect(() => {
        const fetchImages = async () => {
            const imagesPromise = await fetch(`http://127.0.0.1:8000/api/images/${propertyId.id}`)
            // console.log(imagesPromise.ok)
            if (imagesPromise.ok) {
                const imagesData = await imagesPromise.json();
                const imagesDown = imagesData.images[0].original
                await setImages(imagesData.images[0].original);
                // console.log(imagesDown)
                if (imagesDown.length > 0) {
                    setCurrentImage(`http://localhost:8000/${imagesDown[currentImageIndex]['image_path']}`);
                } else {
                    setCurrentImageIndex(null)
                }
            }
        }
        fetchImages()
    }, [currentImageIndex, propertyId.id])

    const next = () => {
        // console.log("current image index: " + currentImageIndex);
        if (currentImageIndex + 1 < images.length) {
            setCurrentImageIndex(currentImageIndex + 1);
            // console.log("image index set to: " + currentImageIndex);
        } else {
            setCurrentImageIndex(0);
            // console.log("image index set to: " + currentImageIndex);
        }
    }

    const previous = () => {
        // console.log("current image index: " + currentImageIndex);
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
            // console.log("image index set to: " + currentImageIndex);
        } else {
            setCurrentImageIndex(images.length - 1);
            // console.log("image index set to: " + currentImageIndex);
        }
    }

    if (currentImage === null) {
        return (
            <h1>There are no images for this property!</h1>
        )
    } else {

        return (
            <>

                <img src={currentImage} alt={'key'}/>
                <div className={'gallery-menu-bar'}>
                    <button className={'gallery-menu-buttons-left'} onClick={previous}>
                        Previous
                    </button>
                    <button className={'gallery-menu-buttons-right'} onClick={next}>
                        Next
                    </button>

                </div>
            </>
        );
    }
};
