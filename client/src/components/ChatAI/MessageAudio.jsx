import React from "react";

const MessageAudio = ({ audio }) => {
  return (
    <div className={"flex flex-col items-" + (audio.sender === "rachel" ? "end" : "start")}>
      {/* Sender */}
      <div className="mt-4">
        <p className={audio.sender === "rachel" ? "text-right mr-2 italic text-green-500" : "ml-2 italic text-blue-500"}>
          {audio.sender}
        </p>

        {/* Message */}
        <audio src={audio.blobUrl} className="mt-1 w-48 appearance-none" controls />
      </div>
    </div>
  );
};

export default MessageAudio;
