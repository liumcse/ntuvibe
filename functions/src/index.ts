import * as functions from 'firebase-functions';
import express from './express';
import * as scheduled from './scheduled';

export const api = functions.region('asia-east2').https.onRequest((req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  express(req, res);
});
export const cacheCourseListSnapshot = functions.region('asia-east2').pubsub.schedule('every day at 05:00').timeZone('Asia/Singapore').onRun(scheduled.cacheCourseListSnapshot);
