"use client"
import React, { useState, useEffect, useRef } from 'react';

export default function Page({params}: {params: {story_id: string}}) {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(true);
    const [inputLoading, setInputLoading] = useState(false);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        const fetchMessages = () => {
            fetch('/api/list_messages?thread_id=' + params.story_id)
                .then(response => response.json())
                .then(data => {
                    if (data.messages[data.messages.length - 1].role === "assistant" && data.messages[data.messages.length - 1].content.length > 0) {
                        setInputLoading(v => false)
                    }
                    setMessages(data.messages);
                    setLoading(v => false);
                });
        }

        fetchMessages();
        const intervalId = setInterval(fetchMessages, 5000);

        return () => clearInterval(intervalId);
    }, [params.story_id]);

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (userInput.trim() !== '') {
            setUserInput(v => '');
            setInputLoading(v => true)
            fetch('/api/send_message?thread_id=' + params.story_id + '&message=' + userInput, {
                method: 'GET',
            })
                .then(response => response.json())
        }
    }

    return (
        <div className={"px-20 pt-10"}>
            {!loading ?
                <div>
                    <ul>
                        {messages.length > 0 && messages.map((message: any) => {
                            if (message.role === "assistant")
                                return <li key={message.id}>{message.content[0]?.text?.value}

                            </li>
                        })}
                        <div ref={messagesEndRef} />
                    </ul>
                    {!inputLoading ? <div className={"flex justify-center my-2 mt-10"}>
                        <input
                            type="text"
                            value={userInput}
                            className={"w-1/2 mr-5 border-2 rounded-2xl h-10 p-2"}
                            onChange={e => setUserInput(e.target.value)}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    handleSend();
                                }
                            }}
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                    : <div>Загрузка...</div>}
                </div>
                : <div>Загрузка...</div>
            }
        </div>
    );
}