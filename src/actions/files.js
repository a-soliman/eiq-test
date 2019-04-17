import axios from "axios";
import { SEND_FILE, GET_FILES, GET_ERRORS } from "./types";

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
      console.log(res.data);
      dispatch({
        type: SEND_FILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("error::: ", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
