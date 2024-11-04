import {useNavigate} from "react-router-dom";
import Loading from "../MainPage/Loading.jsx";
import {useState} from "react";

function LogInForm(props) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('')

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handleSubmit(e)  {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);
        console.log('loading state is: ' + loading);
            fetch('http://127.0.0.1:8000/api/user/login', {
                method : 'POST',
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    email : email,
                    password : password
                })


            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.status){
                        console.log("login was successful! Backend returned token")
                        localStorage.setItem('userToken', data.token);
                        localStorage.setItem('username', data.username);
                        localStorage.setItem('userId', data.id)
                        props.changeUser(data.token)
                        navigate('/');
                    }
                    else {
                        console.error("Backend couldnt found user. Login was unsuccessful")
                        setErrorMessage(data.message);
                    }

                })
                .catch( (e) => {
                    console.error('Error, fetch was unsuccessful! ' + e);
                })
                .finally(() => setLoading(false))
        }
    return (
        <div className="w-1/2 p-4 mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="login-email-input" className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white">Email
                        address: </label>
                    <input type="email" id="login-email-input"
                           name={'login-email-input'}
                           onChange={handleEmailChange}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="john.doe@company.com" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="login-password-form"
                           className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="login-password-form" name={'login-password-form'}
                           onChange={handlePasswordChange}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="•••••••••" required/>
                </div>
                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In
                </button>
                <h1>{errorMessage}</h1>
                {loading ? <Loading/> : ""}
            </form>
        </div>
    );
}

export default LogInForm;