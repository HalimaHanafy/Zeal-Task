import { useAuth } from "../contexts/Auth";
import { BASEURL } from "../utils/Constants";
import Axios from "./ApiClient";


export default {
  usersList: async (token: any) =>
    Axios.get(`${BASEURL}user`, {
      headers: {
        token: token ?? ''
      },
    }).then(({ data }) => data),

  allLocationsList: async (token: any, email: string) =>
    Axios.get(`${BASEURL}location/${(email)}`, {
      headers: {
        token: token ?? ''
      },
    }).then(({ data }) => data),

  addUser: async (token: any, name: string, email: string) =>
    Axios.post(
      `${BASEURL}user`,
      {
        name: name,
        email: email,
        locations: [{ lat: '123456789', lng: '123456789' }],
      },
      {
        headers: {
          token: token
        },
      },
    ).then(({ data }) => data),
  locationsList: async () =>
    Axios.get(`${BASEURL}location`, {
      headers: {
        token: useAuth().authData?.token ?? ''
      },
    }).then(({ data }) => data),

  userDetails: async (token: any, mail: string) =>
    Axios.get(`${BASEURL}location/${mail}`, {
      headers: {
        token: token
      },
    }).then(({ data }) => data),

  addLocation: async (token: any, email: any, lat: string, lng: string) =>
    Axios.post(
      `${BASEURL}location/${(email)
      }`,
      { lat: lat, lng: lng },
      {
        headers: {
          token: token
        },
      },
    ).then(({ data }) => data),

};