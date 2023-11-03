require('dotenv/config')
const crypto = require('crypto')

exports.encrypt = (text = '') => {
  if ( !text || text === '') return {}

  try {
    const iv = crypto.randomBytes(16);
    const key = crypto.createHash('sha256').update(process.env.CRYPTO_SECRET).digest('base64').substring(0, 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString('hex') + ':' + encrypted.toString('hex');

  } catch (error) {
    console.log(error);
  }
}

exports.decrypt = (encryptedText = '') => {
  if ( !encryptedText || encryptedText === '') return {}

  try {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');

    const encryptedData = Buffer.from(textParts.join(':'), 'hex');
    const key = crypto.createHash('sha256').update(process.env.CRYPTO_SECRET).digest('base64').substring(0, 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
    const decrypted = decipher.update(encryptedData);
    const decryptedText = Buffer.concat([decrypted, decipher.final()]);
    return decryptedText.toString();
  } catch (error) {
    console.log(error)
  }
}