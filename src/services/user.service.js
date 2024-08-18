import { publicAxios } from "./axios.services"
import { privateAxios } from "./axios.services"

// user realted api calls


//register new user
export const registerUser = (userdata)=>{
  const response = publicAxios.post(`/users`, userdata);
  return response.data;
};

//get Current user
// Note I am passing token here manually bcoz we are getting user and then login here
export const getCurrentUser= async (token)=>{
  const response = await publicAxios.get(`/users/current`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

//get User By Id

export const getUser= async (userId) =>{
  const response = await privateAxios.get(`/users/${userId}`);
  return response.data;
};

//update user By Id

export const updateUser= async (user)=>{
  const response = await privateAxios.put(`/users/${user.userId}`, user);
  return response.data;
}

//update user profile Image

export const updateUserProfilepic=(file, userId)=>{
  if(file === null){
    return;
  }
  const data = new FormData();
  data.append('userImage', file);
  return privateAxios
  .post(`/users/image/${userId}`, data)
  .then(response => response.data);
}
