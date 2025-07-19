import { baseAPI } from "../customApi"


export const membersCheckApi = async () => {
  return await baseAPI.get('/generation-members');
};



 