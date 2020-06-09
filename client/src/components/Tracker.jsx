import React, { useState, useEffect, Fragment } from "react";
import Button from "react-bootstrap/Button";
import { ReactMic } from "react-mic";
import { sendAudio } from "../lib/api";

const Tracker = (props) => {
  const [isRecording, setRecording] = useState(false);
  const [blobUrl, setUrl] = useState("");
  const [isBlocked, setPermission] = useState(true);

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setPermission(false);
      },
      () => {
        console.log("Permission Denied");
        setPermission(true);
      }
    );
  }, []);

  const handleStart = () => {
    isBlocked ? console.log("Permission Denied") : setRecording(true);
  };

  const handleStop = async (blob) => {
    setUrl(blob.blobURL);
    setRecording(false);
    const formData = new FormData();
    //what is the blob???
    formData.append("file", blob.blob);
    sendAudio(formData);
  };

  return (
    <div className="contain">
      <Fragment>
        <ReactMic
          record={isRecording}
          className="sound-wave"
          onStop={(blob) => handleStop(blob)}
          // onData={(data) => console.log(data)}
          mimeType="audio/wav"
          strokeColor="#ffffff"
          backgroundColor="#000000"

        />
        <div>

          <Button onClick={(event) => handleStart(event)} disabled={isRecording}
            variant='dark'
            backgroundColor="#000000"
            
            >
           <i class="fa fa-bullseye"></i>
          </Button>
            </div>

        <Button
          variant="danger"
          onClick={(event) => handleStop(event)}
          disabled={!isRecording}
        >
          Stop
      </Button>
        <div>
          <audio src={blobUrl} controls="controls" />
        </div>
      </Fragment>
    </div>
  );
};

export default Tracker;
