const jwt = require('jsonwebtoken');
const  JWT_SECRET  = process.env.SECRET || "6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3eefacbba918";

function generateAuthToken(accountId) {
    try {
        const token = jwt.sign({ accountId}, JWT_SECRET, { expiresIn: '15m' });
        return token;
      } catch (error) {
        throw new Error(error);
      }
}

function verifyAuthToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
      } catch (error) {
        throw new Error(error);
      }
}

module.exports = {
  generateAuthToken,
  verifyAuthToken
};