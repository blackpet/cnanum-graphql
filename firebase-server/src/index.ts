import express from 'express';
import cors from 'cors';
import './env';
import {db} from './firebase';
import {firestore} from 'firebase-admin/lib/firestore';
import WriteResult = firestore.WriteResult;

const port: number = Number(process.env.PORT) || 4009;

const app: express.Express = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send('Hello cNanum Study Season 2');
});

app.get('/messages', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const snapshot = await db.collection('test').get();
  const messages = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  console.log(messages);
  res.json({messages});
})

app.get('/mydata', async (req, res) => {
  const snapshot = await db.collection('test').doc('8V0DOmGoNedL6kJsUjVh').get();
  console.log(snapshot.data());
  res.json(snapshot.data());
})

app.get('/set', async (req, res) => {
  const snapshot: WriteResult = await db.collection('test')
    .doc('abcd')
    .set({
      aaa:'234', bbb:true, eeeee: 1
    }, {merge: true});

  res.json({createdAt: snapshot.writeTime});
})

app.post('/setMessage', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.body);
  await db.collection('test').add(req.body);
  res.json({status:'ok'});
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
