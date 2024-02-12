import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("/chathub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                })
                .catch(e => console.log('Connection failed: ', e));

            connection.on('ReceiveMessage', (user, message) => {
                setMessages([...messages, { user, message }]);
            });
        }
    }, [connection, messages]);

    const sendMessage = async () => {
        if (user && message) {
            await connection.send('SendMessage', user, message);
            setMessage('');
        }
    };

    return (
        <div>
            <div>
                <input type="text" placeholder="Enter your name" onChange={(e) => setUser(e.target.value)} />
            </div>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}><strong>{msg.user}:</strong> {msg.message}</li>
                    ))}
                </ul>
            </div>
            <div>
                <input type="text" placeholder="Type your message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
