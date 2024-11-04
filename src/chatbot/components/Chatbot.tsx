import React, { useState } from "react";
import Chat from "./Chat";
import { analyzeNextSteps } from "./AnalizeNextSteps";
//import "./Chatbot.scss";
import {chatbotAPI} from "../../chessboard/api"

interface ResponseBotObject {
  message: string;
  sender: string;
}

const Chatbot: React.FC = () => {
  const [userResponse, setUserResponse] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [botResponse, setBotResponse] = useState<ResponseBotObject>({
    message: "",
    sender: "bot"
  });
  const [sendUserResponse, setSendUserResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<string>("en");

  // setting next step when there's response and 
  const loader = async (fun) => {
    debugger
    setLoading(true);
    const res = await fun()
    setLoading(false);
    return res;
  }

  const setChat = async(prompt: string) => {
    setStep(prevState => prevState + 1);
    const chatResponse = await loader(() => chatbotAPI(prompt, language));
    console.log("hola")
    console.log(chatResponse)
    setSendUserResponse(prompt);
    let res = chatResponse;
    setBotResponse({ message: res, sender: "bot" });
    setUserResponse("");
  };


  // event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={e => handleSubmit(e)} className="form-container">
        <input
          onChange={e => handleInputChange(e)}
          value={userResponse}
        ></input>
        <button>
          <i className="far fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
