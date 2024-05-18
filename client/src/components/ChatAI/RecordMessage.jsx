import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";

const RecordMessage = ({ handleStop }) => {
  return (
    <ReactMediaRecorder
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording }) => (
        <div className="mt-4 flex flex-col items-center">
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            className="bg-green-500 p-4 rounded-full shadow-md transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <RecordIcon
              classText={
                status === "recording" ? "text-red-500" : "text-white"
              }
            />
          </button>
          <p className="mt-2 text-white font-light">
            {status === "recording" ? "Enregistrement en cours" : "Prêt à enregistrer"}
          </p>
        </div>
      )}
    />
  );
};

export default RecordMessage;
