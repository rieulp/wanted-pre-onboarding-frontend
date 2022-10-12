import axios from 'axios';
import { getToken } from './auth';

const BASE_URL = 'https://pre-onboarding-selection-task.shop';

export interface ITodoResponse {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export const requestCreateTodo = (todo: string) => {
  return axios
    .post<ITodoResponse>(`${BASE_URL}/todos`, { todo }, { headers: { 'Content-type': 'application/json', Authorization: `Bearer ${getToken()}` } })
    .then((response) => {
      if (response.status === 201) return response.data;
      return null;
    })
    .catch((error) => {
      return null;
    });
};

export const requestGetTodos = () => {
  return axios
    .get<ITodoResponse[]>(`${BASE_URL}/todos`, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then((response) => {
      if (response.status === 200) return response.data;
      return null;
    })
    .catch((error) => {
      return null;
    });
};

export const requestUpdateTodo = (id: number, todo: string, isCompleted: boolean) => {
  return axios
    .put<ITodoResponse>(
      `${BASE_URL}/todos/${id}`,
      { todo, isCompleted },
      { headers: { 'Content-type': 'application/json', Authorization: `Bearer ${getToken()}` } }
    )
    .then((response) => {
      if (response.status === 200) return response.data;
      return null;
    })
    .catch((error) => {
      return null;
    });
};

export const requestDeleteTodo = (id: number) => {
  return axios
    .delete(`${BASE_URL}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      if (response.status !== 204) throw new Error('');
      return true;
    })
    .catch((error) => {
      return null;
    });
};
