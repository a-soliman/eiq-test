import axios from "axios";
import { SEND_FILE, GET_FILES, GET_ERRORS } from "./types";

export const getFiles = () => dispatch => {
  const url = "/api/files";
  axios
    .get(url)
    .then(res => {
      dispatch({
        type: GET_FILES,
        payload: res.data.entities
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const sendFile = formData => dispatch => {
  const url = "/api/files";
  return axios({
    method: "post",
    url: url,
    data: formData,
    config: {
      headers: { "Content-Type": "multipart/form-data" }
    }
  })
    .then(res => {
      dispatch({
        type: SEND_FILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
