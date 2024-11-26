
import {Carousel, IconButton} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import defaultImages from "../../images/DefaultImages.jsx"

export function CarouselCustomNavigation() {
    const [imagesDown, setImagesDown] = useState(null)
    const propertyId = useParams()

    useEffect(() => {
        const fetchImages = async () => {
            const imagesPromise = await fetch(`http://127.0.0.1:8000/api/images/${propertyId.id}`)
            if (imagesPromise.ok) {
                const imagesData = await imagesPromise.json();
                setImagesDown(imagesData.images)
            }
        }
        fetchImages()
    }, [ propertyId.id])
    return (
        <Carousel
            className="rounded-xl"
            prevArrow={({ handlePrev }) => (
                <IconButton
                    variant="text"
                    color="black"
                    size="lg"
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                </IconButton>
            )}
            nextArrow={({ handleNext }) => (
                <IconButton
                    variant="text"
                    color="black"
                    size="lg"
                    onClick={handleNext}
                    className="!absolute top-2/4 !right-4 -translate-y-2/4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </IconButton>
            )}
        >
            {imagesDown ? imagesDown.map((image, index) => {
                return (
                    <img
                    src={`http://localhost:8000/${image['image_path']}`}
                    alt={`image ${index}`}
                    className="h-full w-full object-cover"
                    key={"image"}
                    />
                )
            }) : defaultImages.map((link, index) => {
                return (
                    <img
                        src={link}
                        alt={`image ${index}`}
                        className="h-full w-full object-cover"
                        key={"image"}
                    />
                )
            })}
        </Carousel>
    );
}