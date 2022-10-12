import axios from 'axios';

const BASE_URL = 'https://pre-onboarding-selection-task.shop';
const USER = 'USER';

export interface IAuthResponse {
  access_token: string;
}

export const requestSignup = (email: string, password: string) => {
  return axios
    .post<IAuthResponse>(`${BASE_URL}/auth/signup`, { email, password }, { headers: { 'Content-type': 'application/json' } })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};

export const requestLogin = (email: string, password: string) => {
  return axios
    .post<IAuthResponse>(`${BASE_URL}/auth/signin`, { email, password }, { headers: { 'Content-type': 'application/json' } })
    .then((response) => {
      localStorage.setItem(USER, response.data.access_token);
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};

export const getToken = () => localStorage.getItem(USER);

export const getLoginState = () => {
  const jwt = getToken();
  if (jwt) return true;
  return false;
};

export const requestLogout = () => {
  localStorage.removeItem(USER);
};
