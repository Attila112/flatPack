import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(props) {
    const navigate = useNavigate();

    function handleLogOut(e) {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
        window.location.reload()
    }

    if (props.user) {
        return(
        <header
        className='flex shadow-lg py-4 px-4 sm:px-10 font-[sans-serif] min-h-[70px] tracking-wide relative z-50 sticky top-0 fixed left-0 right-0 top-0'>
        <div className='flex flex-wrap items-center justify-between gap-4 w-full'>
            <a href="/" 
               className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2">
                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36'/>
            </a>

            <div className='flex items-center ml-auto space-x-6'>
                    <button
                        onClick={handleLogOut}
                        className='font-semibold text-[15px] border-none outline-none text-[#007bff] hover:underline'>
                        Logout
                    </button>
                    <Link to="/favorites">
                        <button
                            className='font-semibold text-[15px] border-none outline-none text-[#007bff] hover:underline'>
                            Favorites
                        </button>
                    </Link>
                    <Link to="/myproperties">
                        <button
                            className='font-semibold text-[15px] border-none outline-none text-[#007bff] hover:underline'>
                            My Properties
                        </button>
                    </Link>
                <Link to="/upload">
                    <button
                        className='px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>
                        Upload
                    </button>
                </Link>
            </div>
        </div>
    </header>
        )
    }

    return (
        <header
            className='flex shadow-lg py-4 px-4 sm:px-10 font-[sans-serif] min-h-[70px] tracking-wide relative z-50 sticky top-0 fixed left-0 right-0 top-0'>
            <div className='flex flex-wrap items-center justify-between gap-4 w-full'>
                <a href="/" 
                   className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2">
                    <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36'/>
                </a>

                <div className='flex items-center ml-auto space-x-6'>
                    <Link to="/login">
                        <button
                            className='font-semibold text-[15px] border-none outline-none text-[#007bff] hover:underline'>
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button
                            className='px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
