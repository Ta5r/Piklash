import express from 'express';
import cors from 'cors';
var app = express();
import router from '../server/router/auth.js';
import "../server/db/conn.js";
app.use(cors());
app.use(express.json({limit:"10mb"}));
app.use(router);
app.listen(5000);