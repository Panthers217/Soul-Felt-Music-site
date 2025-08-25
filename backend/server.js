const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');

app.use(cors());
app.use(bodyParser.json());

// Routers
const artistRouter = require('./routes/artist');
const userRouter = require('./routes/user');
const albumRouter = require('./routes/album');
const trackRouter = require('./routes/track');

app.use('/api/artists', artistRouter);
app.use('/api/users', userRouter);
app.use('/api/albums', albumRouter);
app.use('/api/tracks', trackRouter);

app.get('/', (req, res) => {
  res.send('Soul Felt Music API is running');
});

const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
