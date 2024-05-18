import React, { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";

const ChatBody = ({ chat }) => {
  const aiStyle = "bg-white bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto";

  const parent = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex flex-col gap-4" ref={parent}>
      {chat && Array.isArray(chat) && chat.length > 0 ? (
        chat.map((message, i) => (
          <div
            key={i}
            className={`border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] ${
              message.sender === "ai" && aiStyle
            }`}
          >
            <pre className="whitespace-pre-wrap">
              <span>{message.message}</span>
            </pre>
          </div>
        ))
      ) : (
        <p>No messages</p>
      )}
      <div ref={bottomRef} className="h-3"></div>
    </div>
  );
};

export default ChatBody;
