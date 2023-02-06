import axios from 'axios';
import { URL } from '../constant/variable';
export interface Response {
  data: any;
  status: number;
}
export const loginUser = async (username: String, password: String) => {
  const response: Response = await axios.post(`${URL}/auth/login`, {
    username,
    password
  });
  return response;
};
