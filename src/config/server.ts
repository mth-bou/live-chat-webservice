import express from 'express';
import http from 'http';
import WebSocket from "ws";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

export { app, server, wss };
