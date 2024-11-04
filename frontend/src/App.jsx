import { useState} from 'react'
import './Components/Css/App.css'
import './Components/Css/SystemStyles.css'
import './Components/Css/gallery.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./Components/MainPage/Header.jsx";
import MainPage from "./Components/MainPage/MainPage.jsx";
import LogInForm from "./Components/User/LogInForm.jsx";
import RegisterForm from "./Components/User/RegisterForm.jsx";
import UploadFrom from "./Components/Property/UploadFrom.jsx";
import {Footer} from "./Components/MainPage/Footer.jsx";
import PropertyCard from "./Components/Property/PropertyCard.jsx";
import UploadImages from "./Components/Property/UploadImages.jsx";
import MyFavorites from "./Components/Favorites/MyFavorites.jsx";
import MyProperties from "./Components/MyProperties/MyProperties.jsx";

function App() {
    const [user, setUser] = useState(localStorage.getItem('userToken'))
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [propertyId, setPropertyId] = useState(localStorage.getItem('propertyId'));
    window.addEventListener("storage", () => {
        setUser(localStorage.getItem('userToken'))
        setPropertyId(localStorage.getItem('propertyId'))
        setUsername(localStorage.getItem('username'))
    });
    window.onbeforeunload = function() {
        localStorage.clear();
     }
    return (
        <BrowserRouter>
            <Header user={user} username={username}></Header>
            <Routes>
                <Route path={'/'} element={<MainPage/>} />
                <Route path={'/login'} element={<LogInForm changeUser={(e) => setUser(e)}/>}/>
                <Route path={'/upload'} element={<UploadFrom/>}/>
                <Route path={'/upload/images/:id'} element={<UploadImages/>}/>
                <Route path={'/register'} element={<RegisterForm changeUser={(e) => setUser(e)}/>}/>
                <Route path={'/property/:id'} element={<PropertyCard/>}/>
                <Route path={'/favorites'} element={<MyFavorites/>}/>
                <Route path={'/myproperties'} element={<MyProperties/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}
export default App
