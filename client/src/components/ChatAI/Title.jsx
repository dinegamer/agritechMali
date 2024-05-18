import React, { useState } from "react";
import axios from "axios";
import avatar from "../../Assets/avatar.png"
const Title = ({ setMessages }) => {
  const [isResetting, setIsResetting] = useState(false);

  // Réinitialiser la conversation
  const resetConversation = async () => {
    setIsResetting(true);

    try {
      const res = await axios.get("http://localhost:8000/reset", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error while resetting conversation:", error);
    }

    setIsResetting(false);
  };

  return (
    <div className="flex justify-between items-center w-full p-4 bg-green-500 text-white font-bold shadow">
      <div className="flex items-center">
        <div className="rounded-full h-8 w-8 bg-gray-300 flex items-center justify-center mr-2">
          <img src={avatar} alt="Avatar" className="h-6 w-6 rounded-full" />
        </div>
        <div className="font-semibold">FALO</div>
      </div>
      <button
        onClick={resetConversation}
        className={
          "flex items-center justify-center h-8 w-8 rounded-full bg-transparent text-gray-200 hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-gray-200" +
          (isResetting ? " animate-pulse" : "")
        }
      >
        {isResetting ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Title;
