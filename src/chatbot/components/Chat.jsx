import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Chat = ({ botResponse, sendUserResponse }) => {
  const [messages, setMessages] = useState([]);
  const dummyRef = useRef(null);
  const bodyRef = useRef(null);

  // stacking up messages
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          message:
            "Hi there. If you're here, that means you're looking for a job. Tell me, what's your name?",
          sender: "bot"
        }
      ]);
    } else {
      const tempArray = [...messages];
      tempArray.push({ message: sendUserResponse, sender: "user" });
      setMessages(tempArray);

      setTimeout(() => {
        const temp2 = [...tempArray];
        temp2.push(botResponse);
        setMessages(temp2);
      }, 1000);
    }
  }, [sendUserResponse, botResponse]);

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
    <div className="message-container" ref={bodyRef}>
      {messages.map((chat, index) => (
        <div key={index}>
          <div className={`message ${chat.sender}`}>
            <p>{chat.message}</p>
          </div>
          <div ref={dummyRef} className="dummy-div"></div>
        </div>
      ))}
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
