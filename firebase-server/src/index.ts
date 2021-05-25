import express from 'express';
import cors from 'cors';
import './env';
import {db} from './firebase';

const port: number = Number(process.env.PORT) || 4009;

const app: express.Express = express();
app.use(cors());

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send('Hello cNanum Study Season 2');
});

app.get('/messages', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const snapshot = await db.collection('test').get();
  const messages = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  console.log(messages);
  res.json({messages});
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
