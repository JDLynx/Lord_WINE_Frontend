import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logo from '/img/Lord WINE (3).png';
import "./Chatbot.css"; 

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                const chatbotButton = document.querySelector('.chatbot-button');
                // Se verifica si el elemento fuera del chat es el botón, si no es, cierra el chat.
                if (chatbotButton && !chatbotButton.contains(event.target)) { 
                    setIsChatOpen(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

            // Define los quick replies aquí mismo con las opciones completas
            const quickReplies = [
                "Consultar precio",
                "Disponibilidad de productos",
                "Tiendas disponibles",
                "Hablar con un agente",
                "Consultar categorías",
                "Descripción de productos"
            ];
            
            setMessages([
                { text: initialMessage, sender: 'bot', quickReplies: quickReplies }
            ]);
        }
    }, [isChatOpen]); 

    const sendMessageToDialogflow = async (message) => {
        if (message.trim() !== '') {
            setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }]);
        }
        setInputMessage('');

        try {
            const response = await axios.post(BACKEND_URL, {
                message: message,
                userId: userId
            });

            const { reply, quickReplies } = response.data;
            setMessages(prevMessages => [...prevMessages, { text: reply, sender: 'bot', quickReplies: quickReplies }]);
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

    const handleQuickReplyClick = (replyText) => {
        sendMessageToDialogflow(replyText);
    };

    return (
        <div ref={chatRef} className="fixed bottom-4 right-8 z-50">
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                // 2. AÑADIR LA CLASE CSS PARA LA ANIMACIÓN
                className="chatbot-button bg-[#7a1010] text-white rounded-full p-3 shadow-lg hover:bg-[#921913] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 chatbot-pulse" 
                style={{ width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
            >
                <img
                    src="/img/robot-icon.png"
                    alt="Chatbot Lord Wine"
                    className="w-full h-full object-contain p-1 rounded-full"
                />
            </button>
            {isChatOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-500/20 backdrop-blur-sm" onClick={() => setIsChatOpen(false)}></div>
                    
                    <div className="relative w-11/12 max-w-2xl h-3/4 md:h-[600px] lg:h-[700px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden z-10">
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
                                <div key={index}>
                                    <div
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
                                    {msg.sender === 'bot' && msg.quickReplies && (
                                        <div className="flex flex-wrap gap-2 mt-1 mb-2">
                                            {msg.quickReplies.map((reply, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleQuickReplyClick(reply)}
                                                    className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-300 focus:outline-none"
                                                >
                                                    {reply}
                                                </button>
                                            ))}
                                        </div>
                                    )}
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
                </div>
            )}
        </div>
    );
};

export default Chatbot;