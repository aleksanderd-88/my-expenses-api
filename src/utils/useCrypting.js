require('dotenv/config')
const crypto = require('crypto')

const key = process.env.CRYPTO_SECRET
const algorithm = 'aes-256-cbc';

exports.generateHash = (string = '') => {
  if ( !string || string === '') return {}

  const cipher = crypto.createCipher(algorithm, key);
  let encrypted = cipher.update(string, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted
}

exports.decryptHash = (string = '') => {
  if ( !string || string === '') return {}

  const decipher = crypto.createDecipher(algorithm, key);
  let decrypted = decipher.update(string, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted
}