import React, { useState, useEffect, Fragment } from "react";
import Button from "react-bootstrap/Button";
import { ReactMic } from "react-mic";
import { sendAudio } from "../lib/api";
import fire from "../lib/config";

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

  let interval;
  const handleStart = () => {
    setRecording(true);
    interval = setInterval(() => {
      setRecording(true);
    }, 20000);
  };

  const handleStop = async (blob) => {
    clearInterval(interval);
    setUrl(blob.blobURL);
    setRecording(false);
    const formData = new FormData();
    const userId = fire.auth().currentUser.uid;
    formData.append("file", blob);
    console.log(blob);
    formData.append("user", userId);
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
          <Button
            onClick={(event) => handleStart(event)}
            disabled={isRecording}
            variant="dark"
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
