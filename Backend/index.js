import express from 'express';
import { ChromaClient } from 'chromadb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

const allowedOrigins = process.env.CHROMA_SERVER_CORS_ALLOW_ORIGINS
  ? JSON.parse(process.env.CHROMA_SERVER_CORS_ALLOW_ORIGINS)
  : [];

// app.use(cors({
//   origin: allowedOrigins,
// }));
app.use(cors());


const initChroma = async () => {
  try {
    const client = new ChromaClient();
    const collection = await client.getOrCreateCollection({ name: 'my_collection' });
    
    await collection.upsert({
      documents: [
        'This is a document about pineapple',
        'This is a document about oranges',
      ],
      ids: ['id1', 'id2'],
    });

    const results = await collection.query({
      queryTexts: 'This is a query document about florida',
      nResults: 2,
    });

    console.log(results);
  } catch (error) {
    console.error('Error initializing Chroma:', error);
  }
};

// Root route to respond at http://localhost:8000
app.get('/', (req, res) => {
  res.send('Welcome to the ChromaDB server!');
});

// Test route at http://localhost:8000/api/test
app.get('/api/test', (req, res) => {
  res.send('API is working!');
});

app.get('/favicon.ico', (req, res) => {
  res.status(204); // No Content
});


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await initChroma();
});
