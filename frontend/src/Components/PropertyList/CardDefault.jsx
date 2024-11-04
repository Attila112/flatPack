import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export function CardDefault(props) {

    const [img, setImg] = useState('https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg');
    function currencyFormat(num) {
            return  num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1 ')
        }
        const currencyPrice = currencyFormat(props.price)
        
        useEffect(() => {
        const imgUrl = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/image/${props.id}`);
                const data = await response.json();
    
                if (response.ok && data.success) {
                    setImg(`${data.image}`);
                }
            } catch (err) {
               console.error(err)
            } 
        };
        if(props.hasPicture){
            imgUrl();
        }
    }, [props.hasPicture, props.id]);
    return (<div className="content-center" key={props.id}>
        <Card className="mt-6 w-96 content-center justify-center">
            <CardHeader color="blue-gray" className="relative h-56">
                <img
                    src={img}
                    alt="card-image"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                   Price: {currencyPrice} $
                </Typography>
                <Typography>
                  Address: {props.address}
                </Typography>
                <Typography>
                    Rooms: {props.rooms}
                </Typography>
                <Typography>
                    Size: {props.size}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Link to={`/property/${props.id}`} >
                    <Button onClick={() => localStorage.setItem('propertyId', props.id)}>Read more</Button>
                </Link>

            </CardFooter>
        </Card>
        </div>
    );
}