import streams from "../API/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "./types";

export const signIn = userId => {
  return { type: SIGN_IN, payload: { userId } };
};

export const signOut = () => {
  return { type: SIGN_OUT };
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");
  console.log(`fetchStreams : `, response);
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = streamId => async dispatch => {
  const response = await streams.get(`/streams/${streamId}`);
  console.log(`fetchStream : `, response);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const createStream = formValues => async dispatch => {
  const response = await streams.post("/streams", formValues);
  console.log(`createStream : `, response);
  dispatch({ type: CREATE_STREAM, payload: response.data });
};

export const editStream = (streamId, formValues) => async dispatch => {
  const response = await streams.put(`/streams/${streamId}`, formValues);
  console.log(`editStream : `, response);
  dispatch({ type: EDIT_STREAM, payload: response.data });
};

export const deleteStream = streamId => async dispatch => {
  await streams.delete(`/streams/${streamId}`);
  console.log(`deleteStream : `, streamId);
  dispatch({ type: DELETE_STREAM, payload: streamId });
};
