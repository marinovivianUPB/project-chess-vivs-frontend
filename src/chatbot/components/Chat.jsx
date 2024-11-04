import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Spinner from "../../assets/Spinner";

const Chat = ({ messages, loading }) => {
  const dummyRef = useRef(null);
  const bodyRef = useRef(null);

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
            className={`max-w-lg rounded-lg px-4 py-2 ${chat.sender === "user" ? "bg-blue-900 text-white" : "bg-orange-200 text-gray-800"
              }`}
          >
            <pre className="whitespace-pre-wrap">{chat.message}</pre>
          </div>
        </div>
      ))}
      {loading && <Spinner />}
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
