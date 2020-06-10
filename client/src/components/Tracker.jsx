import React, { useState, useEffect, Fragment } from "react";
import Button from "react-bootstrap/Button";
import { ReactMic } from "react-mic";
import { sendAudio } from "../lib/api";
import fire from "../lib/config";

const Tracker = (props) => {
  const [isRecording, setRecording] = useState(false);
  const [blobUrl, setUrl] = useState("");
  const [isBlocked, setPermission] = useState(true);
  const [interval, setIntervalId] = useState("");
  const [dataArray, setDataArray] = useState([]);

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
    setRecording(true);
    const intervalId = setInterval(() => {
      setRecording(true);
    }, 20000);
    setIntervalId(intervalId);
  };

  const handleStop = async (blob) => {
    clearInterval(interval);
    setUrl(blob.blobURL);
    setRecording(false);
    // to send to server
    const formData = new FormData();
    const userId = fire.auth().currentUser.uid;
    formData.append("audio_data", blob.blob);
    formData.append("user", userId);
    sendAudio(formData);
  };

  const handleOnData = (data) => {
    setDataArray([...dataArray, data]);
  };

  return (
    <div className="contain">
      <Fragment>
        <ReactMic
          record={isRecording}
          className="sound-wave"
          onStop={(blob) => handleStop(blob)}
          onData={(data) => handleOnData(data)}
          mimeType="audio/wav"
          strokeColor="#000000"
          opacity="0"
          timeSlice={3000}
        />
        <div>
          <Button
            onClick={(event) => handleStart(event)}
            disabled={isRecording}
            variant="dark"
            className="btn"
          >
            Run
          </Button>

          <Button
            variant="danger"
            onClick={(event) => handleStop(event)}
            disabled={!isRecording}
          >
            Stop
          </Button>
        </div>
        <div>
          <audio src={blobUrl} controls="controls" />
        </div>
      </Fragment>
    </div>
  );
};

export default Tracker;
