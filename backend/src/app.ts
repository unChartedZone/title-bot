import express, { Request, Response } from 'express';
import axios, { AxiosError, AxiosResponse } from 'axios';
import cors from 'cors';
import cheerio from 'cheerio';
import mongoose, { Schema, Model } from 'mongoose';

import DbManager, { Record } from './dbManager';

const app = express();

app.use(express.json());
app.use(cors());

DbManager.connectDb();

const port = process.env.PORT || 8081;

app.get('/titles', async (req: Request, res: Response) => {
  let records = await Record.find({}, { __v: 0 });
  if (!records) {
    return res.send({
      message: 'Warning: No records.',
      status: 'warning',
    });
  }

  return res.json(records);
});

app.post('/titles', async (req: Request, res: Response) => {
  let { url } = req.body;
  let html = '';

  url = addhttp(url);

  try {
    let result = await axios.get(url);
    html = result.data;
  } catch (e) {
    return res.status(400).send({
      message: `Error: Bad url, couldn't fetch data from ${url}`,
      status: 'error',
    });
  }

  const $ = cheerio.load(html);
  const title = $('head > title').text();

  let existingRecord = await Record.findOne({ url: url });

  if (existingRecord) {
    return res.send({
      message: 'Warning: URL already recorded.',
      status: 'warning',
    });
  }

  const newRecord = new Record({ url, title });
  try {
    let savedRecord = await newRecord.save();
    return res.send(savedRecord);
  } catch (e) {
    console.log('Error saving record to db: ', e);
  }
});

app.delete('/titles/:id', async (req: Request, res: Response) => {
  let { id } = req.params;

  try {
    let result = await Record.findOneAndDelete({ _id: id });
    return res.send(result);
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: 'Error: Something went wrong deleting record.',
      status: 'error',
    });
  }
});

function addhttp(url: string) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = 'http://' + url;
  }
  return url;
}

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
