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
    <Fragment>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={(blob) => handleStop(blob)}
        // onData={(data) => console.log(data)}
        mimeType="audio/wav"
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <Button onClick={(event) => handleStart(event)} disabled={isRecording}>
        Start
      </Button>
      <Button
        variant="danger"
        onClick={(event) => handleStop(event)}
        disabled={!isRecording}
      >
        Stop
      </Button>
      <audio src={blobUrl} controls="controls" />
    </Fragment>
  );
};

export default Tracker;
