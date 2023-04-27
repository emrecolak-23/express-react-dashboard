const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'http://localhost:8000',
  })
);
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes Middlewares
app.use(planetsRouter);
app.use(launchesRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
