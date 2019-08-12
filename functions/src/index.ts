import * as functions from 'firebase-functions';
import express from './express';

export const api = functions.region('asia-east2').https.onRequest((req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  express(req, res);
});