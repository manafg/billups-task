import axios from "axios";

const client = axios.create({
  baseURL: "https://codechallenge.boohma.com",
  headers : {
    Accept: "application/json",
  }
});

export default client;
