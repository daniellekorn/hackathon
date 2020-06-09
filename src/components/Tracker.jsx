import React, { useState, useEffect, Fragment } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const Tracker = (props) => {
  const [isRecording, setRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
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
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const handleStop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        setBlobURL(URL.createObjectURL(blob));
        setRecording(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Fragment>
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
      <audio src={blobURL} controls="controls" />
    </Fragment>
  );
};

export default Tracker;
