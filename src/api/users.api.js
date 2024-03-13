import axios from 'axios';

const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

export const retrieveAllUsers = (jwt) => {
  return axios.get(`${baseURL}/users/all`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
  );
};