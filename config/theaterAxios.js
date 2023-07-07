import axios from "axios";
const token = localStorage.getItem('theaterToken')
const baseURL= "http://3.144.193.210/"
const instance = axios.create({
  baseURL,
  
  headers: {
    Authorization: `Bearer ${token}`,
    Credentials:true,
  }
});

export default instance;