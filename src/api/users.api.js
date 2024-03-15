import axios from 'axios';

const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

export const retrieveAllUsers = (jwt) => {
  return axios.get(`${baseURL}/users/all`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
};

export const retrieveUserInfoById = (jwt, userId) => {
  return axios.get(`${baseURL}/users/${userId}`,{
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
};

export const editUserById = (jwt, userId, editedUser) => {
  return axios.put(`${baseURL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    body: editedUser
  });
};

export const deleteUserById = (jwt, userId) => {
  return axios.delete(`${baseURL}/users/${userId}`,{
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
};