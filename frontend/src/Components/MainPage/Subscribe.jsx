import React, {useState} from 'react';

function Subscribe(props) {
    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false);
    async function handleSubmit (e){
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/subscribe', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body:JSON.stringify({'email': email})
        })
        if (response.ok){
            setSubscribed(true)
        } else if (response.status === 409) {
            alert("You are already subscribed to this mailing list.")
        } else {
            alert("Something went wrong. Pls contact us")
        }
    }
    return (
        <div className="bg-gradient-to-b from-[#1E90FF] to-[#00CED1] py-16 px-6 font-[sans-serif]">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-white md:text-5xl text-4xl font-extrabold mb-6">Join Our Exclusive Newsletter</h2>
                <p className="text-xl text-gray-300">Be part of our elite community. Get VIP access to curated content,
                    early releases, and special promotions.</p>

                <div
                    className="bg-white shadow-lg rounded-lg p-8 mt-12 flex flex-col md:flex-row items-center justify-center">
                    {subscribed ? (<h1>Thanks for the Subscription!</h1>) : (
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder="Enter your email"
                                   onChange={(e) => setEmail(e.target.value)}
                                   required
                                   className="w-full md:w-96 bg-transparent border-b-2 border-[#a91079] py-3 px-4 text-[#2e0249] text-base focus:outline-none placeholder-[#a91079] placeholder-opacity-70"/>
                            <button
                                className="max-md:mt-6 md:ml-4 bg-[#a91079] hover:bg-[#680871] text-white font-semibold py-3 px-6 rounded hover:shadow-md hover:transform hover:scale-105 focus:outline-none">
                                Get Started
                            </button>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Subscribe;