import axios from 'axios';

export const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;
