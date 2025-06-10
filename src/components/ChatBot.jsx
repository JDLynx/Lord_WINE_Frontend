import { useState, useEffect, useRef } from "react";
import "./ChatBot.css";

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { from: "user", text: input };
        const botReply = {
        from: "bot",
        text: "Gracias por tu mensaje. Estoy procesando tu solicitud..."
        };

        setMessages((prev) => [...prev, userMessage]);

        setTimeout(() => {
        setMessages((prev) => [...prev, botReply]);
        }, 1000);

        setInput("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chatbot-container">
        <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
            {open ? "✕" : "💬"}
        </button>

        {open && (
            <div className="chatbot-box">
            <div className="chatbot-header">Chatbot Virtual</div>

            <div className="chatbot-messages">
                {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`chat-message ${msg.from === "user" ? "user-message" : "bot-message"}`}
                >
                    {msg.text}
                </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input-area">
                <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escribe un mensaje..."
                className="chatbot-input"
                />
                <button onClick={handleSend} className="chatbot-send">Enviar</button>
            </div>
            </div>
        )}
        </div>
    );
}
