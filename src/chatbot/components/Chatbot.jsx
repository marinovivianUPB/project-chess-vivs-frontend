import React, { useState } from "react";
import Chat from "./Chat";
import {chatbotAPI} from "../../chessboard/api"
import Input from "./Input";


const Chatbot = ({welcomeMsg, msg}) => {
  const [userResponse, setUserResponse] = useState("");
  const [step, setStep] = useState(0);
  const [botResponse, setBotResponse] = useState({
    message: "",
    sender: "bot"
  });
  const [sendUserResponse, setSendUserResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");

  const [isChatOpen, setIsChatOpen] = useState(false);

 

  // setting next step when there's response and 
  const loader = async (fun) => {
    debugger
    setLoading(true);
    const res = await fun()
    setLoading(false);
    return res;
  }

  const setChat = async(prompt) => {
    setStep(prevState => prevState + 1);
    const chatResponse = await loader(() => chatbotAPI(prompt));
    console.log("hola")
    console.log(chatResponse)
    setSendUserResponse(prompt);
    let res = chatResponse;
    setBotResponse({ message: res, sender: "bot" });
    setUserResponse("");
  };
  


  // event handlers

  const handleInputChange = (e ) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        {isChatOpen ? "Close" : "Chat"}
      </button>

      {/* Chat en ventana modal */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-5 w-80 bg-white rounded-lg shadow-lg z-50 flex flex-col">
          <div className="p-4 max-w-lg mx-auto bg-cyan-800 rounded-lg shadow-lg flex flex-col h-[60vh]">
            <div className="flex-grow overflow-y-auto mb-4">
              <Chat
                userResponse={userResponse}
                botResponse={botResponse}
                sendUserResponse={sendUserResponse}
                welcomeMsg={welcomeMsg}
              />
            </div>
            <Input
              value={userResponse}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              msg={msg}
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
      )}
    </div>
  );
};

export default Chatbot;


