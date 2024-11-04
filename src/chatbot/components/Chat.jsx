import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Chat = ({ userResponse,botResponse, sendUserResponse, welcomeMsg }) => {
  const [messages, setMessages] = useState([]);
  const dummyRef = useRef(null);
  const bodyRef = useRef(null);
  const [processedUserResponse, setProcessedUserResponse] = useState("");
  
  // stacking up messages
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          message: welcomeMsg,
          sender: "bot"
        }
      ]);
      
    } else if (sendUserResponse !== processedUserResponse){
      
      const tempArray = [...messages];
      tempArray.push({ message: sendUserResponse, sender: "user" });
      
      setMessages(tempArray);
      setProcessedUserResponse(sendUserResponse); // Mark response as processed

      
      setTimeout(() => {
        const temp2 = [...tempArray];
        temp2.push(botResponse);
        setMessages(temp2);
      }, 1000);
    }
  }, [sendUserResponse, botResponse, welcomeMsg]);

 

  // enable autoscroll after each message
  useEffect(() => {
    if (dummyRef.current && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: dummyRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }, [messages]);

  return (
    <div
      className="message-container overflow-y-auto h-full px-4"
      ref={bodyRef}
    >
      {messages.map((chat, index) => (
        <div key={index} className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"} my-2`}>
          <div
            className={`max-w-xs rounded-lg px-4 py-2 ${
              chat.sender === "user" ? "bg-blue-900 text-white" : "bg-orange-200 text-gray-800"
            }`}
          >
            <pre className="whitespace-pre-wrap">{chat.message}</pre>
          </div>
        </div>
      ))}
      <div ref={dummyRef} className="dummy-div"></div>
    </div>
  );
};


Chat.propTypes = {
  botResponse: PropTypes.shape({
    message: PropTypes.string,
    sender: PropTypes.string
  }),
  sendUserResponse: PropTypes.string
};

export default Chat;
