import { useState } from "react";
import Chat from "./Chat";
import { analyzeNextSteps } from "../AnalizeNextSteps";
import Input from "./Input";

const Chatbot = () => {
  const [userResponse, setUserResponse] = useState(""); 
  const [step, setStep] = useState(0); 
  const [botResponse, setBotResponse] = useState({
    message: "",
    sender: "bot"
  }); 
  const [sendUserResponse, setSendUserResponse] = useState(""); 

  const setNextStep = (response) => {
    setStep(prevState => prevState + 1);
    setSendUserResponse(response);
    const res = analyzeNextSteps(step, response);
    setBotResponse({ ...res, sender: "bot" });
    setUserResponse("");
  };

  const handleInputChange = (e) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNextStep(userResponse);
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
