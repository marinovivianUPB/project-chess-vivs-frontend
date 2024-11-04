import React, { useState, useEffect, useRef } from "react";
//import "./Chat.scss";

interface Props {
  userResponse: string;
  botResponse: {
    message: string;
    sender: string;
  };
  sendUserResponse: string;
}

interface MessagesInfo {
  message: string;
  sender: string;
}

const Chat: React.FC<Props> = props => {
  const [messages, setMessages] = useState<MessagesInfo[]>([]);
  const dummyRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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
      let tempArray = [...messages];
      tempArray.push({ message: props.sendUserResponse, sender: "user" });
      setMessages(tempArray);

      setTimeout(() => {
        let temp2 = [...tempArray];
        temp2.push(props.botResponse);
        setMessages(temp2);
      }, 1000);
    }
  }, [props.sendUserResponse, props.botResponse]);

  // enable autoscroll after each message
  useEffect(() => {
    if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: dummyRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }, [messages]);

  return (
    <div className="message-container" ref={bodyRef}>
      {messages.map(chat => (
        <div key={chat.message}>
          <div className={`message ${chat.sender}`}>
            <p>{chat.message}</p>
          </div>
          
          <div ref={dummyRef} className="dummy-div"></div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
