import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logo from '/img/Lord WINE (3).png';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const chatRef = useRef(null);

    const userId = 'user-lordwine-frontend-1';
    const BACKEND_URL = 'https://lord-wine-backend.onrender.com/api/dialogflow/dialogflow-query';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Lógica para cerrar el chat al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Si el chat está abierto y el clic no está en el contenedor del chat o el botón
            if (chatRef.current && !chatRef.current.contains(event.target) && event.target.tagName !== 'BUTTON') {
                setIsChatOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez al montar

    // Lógica para el saludo inicial
    useEffect(() => {
        if (isChatOpen && messages.length === 0) {
            const getGreeting = () => {
                const currentHour = new Date().getHours();
                if (currentHour >= 5 && currentHour < 12) {
                    return '¡Buenos días!';
                } else if (currentHour >= 12 && currentHour < 19) {
                    return '¡Buenas tardes!';
                } else {
                    return '¡Buenas noches!';
                }
            };
            const greeting = getGreeting();
            const initialMessage = `${greeting} Soy el asistente virtual de Lord Wine, ¿en qué puedo ayudarte?`;
            setMessages([{ text: initialMessage, sender: 'bot' }]);
        }
    }, [isChatOpen, messages.length]); // para que el saludo solo se añada si no hay mensajes

    const sendMessageToDialogflow = async (message) => {
        setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }]);
        setInputMessage('');

        try {
            const response = await axios.post(BACKEND_URL, {
                message: message,
                userId: userId
            });

            const botReply = response.data.reply;
            setMessages(prevMessages => [...prevMessages, { text: botReply, sender: 'bot' }]);
        } catch (error) {
            console.error("Error al comunicarse con el backend de Dialogflow:", error);
            setMessages(prevMessages => [...prevMessages, { text: "Lo siento, hubo un error al conectar con el asistente.", sender: 'bot' }]);
        }
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            sendMessageToDialogflow(inputMessage.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div ref={chatRef} className="fixed bottom-4 right-8 z-50">
            {/* Botón para abrir/cerrar el chat */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="bg-[#7a1010] text-white rounded-full p-3 shadow-lg hover:bg-[#921913] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                style={{ width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
            >
                <img
                    src="/img/robot-icon.png"
                    alt="Chatbot Lord Wine"
                    className="w-full h-full object-contain p-1 rounded-full"
                />
            </button>

            {/* Contenedor del chat*/}
            {isChatOpen && (
                <div className="absolute bottom-20 right-8 w-80 h-[450px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
                    <div className="bg-[#7a1010] text-white p-3 flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={logo} alt="LordWine Logo" className="h-6 w-auto mr-2" />
                            <h3 className="text-lg font-bold">ChatBot</h3>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">
                            ✖
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto bg-white">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] p-2 rounded-lg ${
                                        msg.sender === 'user'
                                            ? 'bg-[#7a1010] text-white rounded-br-none'
                                            : 'bg-gray-300 text-gray-800 rounded-bl-none'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t flex items-center bg-white">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Escribe tu mensaje..."
                            className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-[#7a1010] text-white rounded-full p-2 px-4 hover:bg-[#921913] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;