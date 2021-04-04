import express, { Request, Response } from 'express';
import axios, { AxiosError, AxiosResponse } from 'axios';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());


const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
