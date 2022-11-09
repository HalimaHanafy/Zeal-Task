import { BASEURL } from "../utils/Constants";
import Axios from "./ApiClient";

// export type AuthData = {
//   token: string;
//   email: string;
//   name: string;
// };

export interface Admin {
  email: string;
  name: string;
}

export interface AuthData {
  admin: Admin;
  token: string;
}
export default {
  login: (email: string, password: string) =>
    Axios.post(`${BASEURL}login`, {
      email: email,
      password: password,
    }).then(({ data }) => data)
      .catch(e => console.warn(e)),

  register: (email: string, password: string, name: string) =>
    Axios.post(`${BASEURL}register`, {
      email: email,
      password: password,
      name: name,
    })
      .then(({ data }) => data)
      .catch(e => console.warn(e)),
};
