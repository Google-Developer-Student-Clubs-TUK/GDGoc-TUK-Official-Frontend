import { baseAPI } from "@/app/_lib/customApi";

export const generationsApi = async () => {
  return await baseAPI.get('/recruitments/generations');
};


export const generationMembersApi = async ({generation } : {generation :string}) => {
  return await baseAPI.get(`/generation-members/introduction/${generation}`, { params : {
    generation
  } 
})}

 