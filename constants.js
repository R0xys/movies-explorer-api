const devKey = 'imposible-key';
const productionKey = process.env.JWT_SECRET;
const nodeEnv = process.env.NODE_ENV;
const bitFilmsDbPath = process.env.MONGO_PATH;
const { PORT = 3000 } = process.env;
const urlPattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;

module.exports = {
  devKey,
  productionKey,
  nodeEnv,
  PORT,
  bitFilmsDbPath,
  urlPattern,
};
