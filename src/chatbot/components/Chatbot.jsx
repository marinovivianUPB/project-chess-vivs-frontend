import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import { chatbotAPI } from "../../chessboard/api"
import Input from "./Input";
import { useLanguage } from "../../language";

const Chatbot = () => {
  const [userResponse, setUserResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { text } = useLanguage();

  useEffect(() => {
    const welcomeMsg = text['welc'];
    setMessages([{ message: welcomeMsg, sender: "bot" }, ...messages.splice(1)]);
  }, [text]);
  
  const setChat = async (prompt) => {
    setMessages(msg => [...msg, { message: prompt, sender: "user" }]);
    setUserResponse("");
    setLoading(true);
    const chatResponse = await chatbotAPI(prompt);
    setMessages(msg => [...msg, { message: chatResponse, sender: "bot" }]);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userResponse) return;
    setChat(userResponse);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };


  return (
    <div>
      {/* Botón flotante para abrir/cerrar el chat */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-600 transition duration-300 z-50"
      >
        {isChatOpen ? text['cls'] : 'Chat'}
      </button>

      {/* Chat en ventana modal */}
      <div className={`${isChatOpen ? "flex" : "hidden"} fixed bottom-20 right-5 w-[40rem] bg-white rounded-lg shadow-lg z-50 flex-col`}>
        <div className="p-4 bg-cyan-800 rounded-lg shadow-lg flex flex-col h-[80vh]">
          <div className="flex-grow overflow-y-auto mb-4">
            <Chat
              // userResponse={userResponse}
              // botResponse={botResponse}
              // sendUserResponse={sendUserResponse}
              // welcomeMsg={text['welc']}
              loading={loading}
              messages={messages}
            />
          </div>
          <Input
            value={userResponse}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            msg={text['msg']}
            send={text['sn']}
          />
        </div>
        {/* Botón para cerrar el modal */}
        <button
          onClick={toggleChat}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Chatbot;


