import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Loading from "../MainPage/Loading.jsx";
import SystemMessage from "../SystemMessage.jsx";

export default function RegisterForm(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [responseMessages, setResponseMessages] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setResponseMessages(null);
        fetch('http://127.0.0.1:8000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username' : username,
                'email' : email,
                'password' : password,
                'password_confirmation' : passwordAgain
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((info) => {
                console.log(info)
                if (info.status) {
                    setResponseMessages({
                        type : 'confirm',
                        messages : ['Registration successful!']
                    })
                    localStorage.setItem('userToken', info.token);
                    localStorage.setItem('username', username);
                    localStorage.setItem('userId', info.newUserId)
                    props.changeUser(info.token)
                    navigate('/')
                    // window.location.reload()
                } else {

                    console.log("Registration failed:", info);
                    const errors = Object.values(info.errors);
                    setResponseMessages({
                        type : 'error',
                        messages : errors
                    });
                }
            })
            .catch((e) => {
                console.log("ERROR:", e.message);
                setResponseMessages(['There was a fatal error in the system! Try reloading the page, or retry later']);
            })
            .finally(() => {
                setLoading(false);
            });

        console.log('registering....');
    }

    function setInfo(e) {
        const targetField = e.target.name;

        const setters = {
            'username': setUsername,
            'email': setEmail,
            'password': setPassword,
            'password_confirmation': setPasswordAgain,
        };

        if (setters[targetField]) {
            setters[targetField](e.target.value);
        }
    }

    return (
        <div className="w-1/2 p-4 mx-auto" key={"registerForm"}>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="register-username-input" className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white">Username: </label>
                    <input type="text" id="register-username-input"
                           onChange={setInfo}
                           name={'username'}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="john.doe112" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="register-email-input" className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white">Email
                        address: </label>
                    <input type="email" id="register-email-input" name={'email'}
                           onChange={setInfo}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="john.doe@company.com" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="register-password-input"
                           className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white">Password:</label>
                    <input type="password" id="register-password-input" name={'password'}
                           onChange={setInfo}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="•••••••••" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="register-password-confirm-input"
                           className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white">Confirm
                        password</label>
                    <input type="password" id="register-password-confirm-input"
                           name={'password_confirmation'}
                           onChange={setInfo}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="•••••••••" required/>
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value=""
                               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                               required/>
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I
                        agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms
                            and conditions</a>.</label>
                </div>
                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register
                </button>
            </form>

            {loading ? <Loading/> : ''}
            {responseMessages ?
                responseMessages.messages.map((m) =>
                    <SystemMessage message={m} messageType={responseMessages.type}/>
                )
                :
                ''
            }
        </div>
    );
}
