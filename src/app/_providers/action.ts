'use server';
import { cookies } from 'next/headers';

export async function getMyCookie() {
  const cookieStore = cookies();
  const  myCookie = (await cookieStore).get("JSESSIONID");
  return myCookie 
}

