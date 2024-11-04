import React, { useState } from "react";
import Chat from "./Chat";
import {chatbotAPI} from "../../chessboard/api"
import Input from "./Input";


const Chatbot = () => {
  const [userResponse, setUserResponse] = useState("");
  const [step, setStep] = useState(0);
  const [botResponse, setBotResponse] = useState({
    message: "",
    sender: "bot"
  });
  const [sendUserResponse, setSendUserResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");

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

  return (
    <div className="chat-container">
      <Chat
        userResponse={userResponse}
        botResponse={botResponse}
        sendUserResponse={sendUserResponse}
      />
      <Input 
        value={userResponse}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Chatbot;
