import axios from 'axios';

const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

export const createNewProgressRegister = (jwt, email, exercise_code, correct_answers) => {
  alert(jwt)
  return axios.post(`${baseURL}/exercises-progress/create`, 
    {
      "user_email": email,
      "exercise_code": exercise_code,
      "organization_name": "",
      "evaluation_type": "Evaluation",
      "correct_answers": correct_answers,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`
      },
    }
  );
};