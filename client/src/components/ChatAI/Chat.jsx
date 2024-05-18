import React, { useState } from "react";
import "./index.css";
import Title from "./Title";
import RecordMessage from "./RecordMessage";
import MessageAudio from "./MessageAudio"; // Nouveau composant pour afficher les messages audio
import axios from "axios";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  function createBlobURL(data) {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  }

  const handleStop = async (blobUrl) => {
    setIsLoading(true);

    // Append recorded message to messages
    const myMessage = { sender: "agriai", blobUrl };
    const messagesArr = [...messages, myMessage];

    // convert blob url to blob object
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        // Construct audio to send file
        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        // send form data to api endpoint
        await axios
          .post("http://localhost:8000/post-audio", formData, {
            headers: {
              "Content-Type": "audio/mpeg",
            },
            responseType: "arraybuffer", // Set the response type to handle binary data
          })
          .then((res) => {
            const blob = res.data;
            const audio = new Audio();
            audio.src = createBlobURL(blob);

            // Append to audio
            const faloMessage = { sender: "falo", blobUrl: audio.src };
            messagesArr.push(faloMessage);
            setMessages(messagesArr);

            // Play audio
            setIsLoading(false);
            audio.play();
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
          });
      });
  };

  return (
    <div className="h-screen overflow-y-hidden">
      {/* Title */}
      <Title setMessages={setMessages} />

      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        {/* Conversation */}
        <div className="mt-5 px-5">
          {messages?.map((audio, index) => (
            <MessageAudio key={index} audio={audio} />
          ))}

          {messages.length === 0 && !isLoading && (
            <div className="text-center mt-10">
              <div className="bg-gray-200 p-4 rounded-lg inline-block">
                <p className="font-light italic text-gray-700">
                  Bienvenue ! Appuyez sur le microphone pour enregistrer un message pour Falo...
                  I danse! Mikoro digi walasa ka cikan dɔ sɛbɛn Falo...
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="text-center font-light italic mt-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>

        {/* Recorder */}
        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-sky-500 to-green-500">
          <div className="flex justify-center items-center w-full">
            <RecordMessage handleStop={handleStop} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
