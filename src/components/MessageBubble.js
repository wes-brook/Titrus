import React, { useEffect, useState } from "react";
import "./MessageBubble.css";

function MessageBubble({ messages = [], typingDelay = 2000, clearDelay = 5000 }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedMessages, setDisplayedMessages] = useState([]);

  useEffect(() => {
    if (messages.length === 0) return;

    setIsTyping(true);
    
    // Show typing indicator for a delay, then type out the message
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
      const fullMessage = messages[currentMessageIndex] || ""; // Ensure message exists
      let index = 0;

      const typingInterval = setInterval(() => {
        setDisplayedMessages((prev) => {
          const newMessages = [...prev];
          newMessages[currentMessageIndex] = fullMessage.slice(0, index + 1);
          return newMessages;
        });
        index++;
        if (index === fullMessage.length) clearInterval(typingInterval);
      }, 50);

      // Clear message after a delay and move to the next one
      const clearMessageTimeout = setTimeout(() => {
        setDisplayedMessages((prev) => {
          const newMessages = [...prev];
          newMessages[currentMessageIndex] = null; // Clear current message for fade out
          return newMessages;
        });

        // If there are more messages, continue to the next one
        if (currentMessageIndex < messages.length - 1) {
          setCurrentMessageIndex((prevIndex) => prevIndex + 1);
          setIsTyping(true);
        }
      }, clearDelay);

      return () => {
        clearInterval(typingInterval);
        clearTimeout(clearMessageTimeout);
      };
    }, typingDelay);

    return () => clearTimeout(typingTimeout);
  }, [currentMessageIndex, messages, typingDelay, clearDelay]);

  return (
    <div className="message-container">
      {displayedMessages.map((message, index) => (
        message !== null && (
          <div key={index} className={`message-bubble ${message ? "visible" : ""}`}>
            {message}
          </div>
        )
      ))}
      {isTyping && (
        <div className="typing-bubble">
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
