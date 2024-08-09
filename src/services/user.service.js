import { publicAxios } from "./axios.services"
// user realted api calls


//register new user
export const registerUser =(userdata)=>{
  return publicAxios.post(`/users`, userdata).then((Response)=> Response.data);
};

//get Current user
export const getCurrentUser=()=>{
  return publicAxios.get(`/users/current`).then((Response)=> Response.data);
}

