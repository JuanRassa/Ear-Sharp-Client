import axios from 'axios';

const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

export const retrieveAllExercisesInfo = (jwt) => {
  return axios.get(`${baseURL}/exercises-info/all`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
};

export const retrieveExerciseInfoByCode = (jwt, code) => {
  return axios.get(`${baseURL}/exercises-info/${code}`,{
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
};