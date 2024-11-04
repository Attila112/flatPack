import React, {useEffect, useState} from 'react';

function Inbox(props) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/messages', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response is not okay")
                }

                const data = await response.json()
                setMessages(data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchMessages()
    }, [])

    return (
        <>
            <div>
                <h1> Inbox:</h1>
                <ul>
                    {messages.map(message => (
                        <li key={message.id}>
                            <strong>From:</strong> {message.id_user_from} <br/>
                            <strong>Subject:</strong> {message.title} <br/>
                            <strong>Message:</strong> {message.message} <br/>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )

}

export default Inbox;