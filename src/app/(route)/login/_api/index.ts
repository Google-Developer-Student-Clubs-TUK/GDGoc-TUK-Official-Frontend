import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);

  return await axios.post(`${BASE_URL}/login`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
     withCredentials: true, 
  });
};
