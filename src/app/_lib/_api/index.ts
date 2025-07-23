import { baseAPI } from "../customApi"


export const membersCheckApi = async () => {
  return await baseAPI.get('/generation-members');
};


 

export const logoutApi = async () => {
  return await baseAPI.post('/logout');


};



 