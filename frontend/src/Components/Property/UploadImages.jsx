import React, { useState } from "react";
import {Button, Input} from "@material-tailwind/react";
import {Link, useNavigate, useParams} from "react-router-dom";

function UploadImages() {
    const [imageFiles, setImageFiles] = useState([]);
    const propertyId = useParams().id;

    console.log(propertyId);

    const handleImageChange = (e) => {
        setImageFiles([...e.target.files]);
    };

    // Fetch and upload multiple images
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!imageFiles.length || !propertyId) {
            console.error("No images selected or property ID is missing");
            return;
        }

        const formData = new FormData();

        // Loop through each image and append to formData
        imageFiles.forEach((file, index) => {
            formData.append(`image_path[]`, file);
            formData.append('name', `picture ${index + 1}`);
        });

        formData.append('property_id', propertyId);

        const response = await fetch('http://127.0.0.1:8000/api/upload_image', {
            method: "POST",
            headers: {
                "Accept": "application/json", // Only Accept header is needed
            },
            body: formData,
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
           alert("The pictures uploaded")
            // You can navigate somewhere after successful upload
        } else {
            console.log("Error in uploading images", data);
        }
        console.log(propertyId);
    };

    return (
        <div>
            <h1>Upload Multiple Images for Property</h1>
            <form onSubmit={handleUpload}>
                <Input
                    label={'Select Images'}
                    name={'images'}
                    type={"file"}
                    onChange={handleImageChange}
                    multiple
                />
                <button type="submit">Upload Images</button>
            </form>
            <div>

                <Link to={`/property/${propertyId}`} >
                    <Button onClick={() => localStorage.setItem('propertyId', propertyId)}>
                        Finish
                    </Button>
                </Link>


            </div>
            <Link to={`/upload`}>
                <button>Back</button>
            </Link>
        </div>
    );
}

export default UploadImages;
