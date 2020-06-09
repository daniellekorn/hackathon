import axios from "axios";

export const sendAudio = async (data) => {
  await axios.post("/tracker", data);
};
