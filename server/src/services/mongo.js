const mongoose = require('mongoose');
const MONGO_URI =
  'mongodb+srv://emrecolak:emco3232@cluster0.awtf9.mongodb.net/Nasa-Project?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (error) => {
  console.error(error);
});

async function connectDB() {
  await mongoose.connect(MONGO_URI);
}

async function disconnectDB() {
  await mongoose.disconnect();
}

module.exports = {
  connectDB,
  disconnectDB,
};
