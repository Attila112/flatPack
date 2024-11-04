import React, {useState} from 'react';
import Searchbar from "../Searchbar/Searchbar.jsx";
import PropertyList from "../PropertyList/PropertyList.jsx";
import Pagination from "./Pagination.jsx";

function MainPage(props) {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    return (
            <div className='m-10 p-10 bg-cyan-50 shadow-[0_20px_150px_rgba(207,_250,_254,_0.7)] rounded-2xl grid grid-cols-1 gap-4 justify-items-center'>
                <Searchbar properties={properties} changeProperties={(e) => setProperties(e)} page={page}
                           changePageNumber={(e) => setPageNumber(e)} changePage={(e) => setPage(e)}/>
                <PropertyList properties={properties}/>
                <Pagination page={page} changePage={(e) => setPage(e)} properties={properties} pageNumber={pageNumber}/>
            </div>
    );
}

export default MainPage;