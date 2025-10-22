import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import artistRouter from './routes/artist.js';
// import userRouter from './routes/user.js';
import albumRouter from './routes/album.js';
import trackRouter from './routes/track.js';
import adminRouter from './routes/admin.js';
import authRouter from './routes/auth.js';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { getTables } from './controllers/admin/adminController.js';
dotenv.config();


admin.initializeApp({
  credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
    }),
});

const app = express();


app.use(cors());
app.use(bodyParser.json());

// Debug logging for auth routes
app.use('/api/auth', (req, res, next) => {
  console.log(`🔍 Auth route hit: ${req.method} ${req.originalUrl}`);
  console.log('Headers:', { authorization: req.headers.authorization?.substring(0, 20) + '...' });
  next();
});
// app.post('/api/admin/verify', async (req, res) => {
//   const { idToken } = req.body;
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     // Optionally check for admin privileges here
//     res.json({ success: true, uid: decodedToken.uid });
//   } catch (error) {
//     res.status(401).json({ success: false, message: 'Invalid token' });
//   }
// });


app.use('/api/artists', artistRouter);
// app.use('/api/artist-images', artistImageRouter);
// app.use('/api/users', userRouter);
app.use('/api/albums', albumRouter);
app.use('/api/auth', authRouter);
app.use('/api/tracks', trackRouter);
app.get('/', (req, res) => {
  res.send('Soul Felt Music API is running');
});
// Middleware to require admin
export async function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    if (decoded.admin === true) {
      req.user = decoded;
      return next();
    }
    return res.status(403).json({ error: 'Not an admin' });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Routers

app.use('/api/admin', adminRouter);
// app.use('/api/admin', getTables);




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
