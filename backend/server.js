
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import artistRouter from './routes/artist.js';
// import userRouter from './routes/user.js';
import albumRouter from './routes/album.js';
import trackRouter from './routes/track.js';
import adminRouter from './routes/admin.js';
import { getTables } from './controllers/admin/adminController.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routers
app.use('/api/artists', artistRouter);
// app.use('/api/artist-images', artistImageRouter);
// app.use('/api/users', userRouter);
app.use('/api/albums', albumRouter);
app.use('/api/tracks', trackRouter);
app.use('/api/admin', adminRouter);
// app.use('/api/admin', getTables);
app.get('/', (req, res) => {
  res.send('Soul Felt Music API is running');
});




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
