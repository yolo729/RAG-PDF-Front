import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// user profile api
export const getProfile = () => {
  return axios.get(`${API_URL}/profile`);
};

export const editProfile = (values) => {
  return axios.put(`${API_URL}/profile/edit`, values);
};

// change password api
export const updatePassword = (values) => {
  return axios.put(`${API_URL}/auth/updatepassword`, values);
};

// upload file
export const uploadFile = (files) => {
  const formData = new FormData();
  [...files].map((file) => {
    formData.append("files", file);
  });
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  return axios.post(`${API_URL}/user_query/uploadFile`, formData, config);
};
// retrain model (file)
export const retrainModel = (files) => {
  return axios.post(`${API_URL}/user_query/retrainModel`);
};
// retrieve all files api
export const getAllFiles = (values) => {
  return axios.get(`${API_URL}/user_query/getAllFiles`);
};

// delete Model (file)
export const deleteModel = (payload) => {
  return axios.post(`${API_URL}/user_query/deleteModel`, payload);
};

// LLM Key
export const setLLMKey = (value) => {
  return axios.post(`${API_URL}/user_query/setLlmKey`, value);
};

// LLM Temperature
export const setLLMTemperature = (value) => {
  return axios.post(`${API_URL}/user_query/setllmTemp`, value);
};

// retrain all models (files)
export const retrainAllModels = (files) => {
  return axios.post(`${API_URL}/user_query/retrainAllModels`, { files });
};
// set active model
export const setActiveModelApi = (id) => {
  return axios.post(`${API_URL}/user_query/setActiveModel`, { id });
};
// set active model
export const getActiveModelApi = () => {
  return axios.get(`${API_URL}/user_query/getActiveModel`);
};

// Prompt
export const setPrompt = (value) => {
  return axios.post(`${API_URL}/prompt/set`, value);
};

export const getUserPrompt = () => {
  return axios.get(`${API_URL}/prompt/get`);
};

//set GPT model name

export const setGPT = (value) => {
  return axios.post(`${API_URL}/user_gpt/setGPT`, value);
};

export const getUserGPT = () => {
  return axios.get(`${API_URL}/user_gpt/get`);
};
