import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL;
const localUrl = process.env.LOCAL_NETWORK;

export const corsOption = {
  origin: [`${baseUrl}:${port}`, `${localUrl}:${port}`],
  methods: 'GET,POST, PUT, PATCH, DELETE',
  optionSuccessStatus: 204,
};
