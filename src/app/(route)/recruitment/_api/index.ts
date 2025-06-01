import { baseAPI } from "@/app/_lib/customApi";

export const recruitmentsStatusApi = async () => {
  return await baseAPI.get('/recruitments/status');
};




export const recruitmentsApi = async ({ openAt, closeAt ,generation} :{ openAt : string, closeAt : string, generation: string}) => {
  return await baseAPI.post("/recruitments",{
  openAt,
  closeAt,
  generation

})}

 