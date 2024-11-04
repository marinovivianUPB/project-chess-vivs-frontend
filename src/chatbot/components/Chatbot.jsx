import { useState } from "react";
import Chat from "./Chat";
import { analyzeNextSteps } from "./AnalizeNextSteps";

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

  // Manejadores de eventos
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
      <form onSubmit={handleSubmit} className="form-container">
        <input
          onChange={handleInputChange}
          value={userResponse}
        />
        <button>
          <i className="far fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
