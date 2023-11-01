require('dotenv/config')
const crypto = require('crypto')

const secret = process.env.CRYPTO_SECRET
const algorithm = 'aes-256-cbc';
const iv = crypto.scryptSync(secret, 'salt', 32)

exports.encrypt = (string = '') => {
  if ( !string || string === '') return {}

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(string, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted
}

exports.decrypt = (string = '') => {
  if ( !string || string === '') return {}

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(string, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted
}