const cryto = require('crypto');
const rememberSize = 256;

module.exports = () => {
  return new Promise((resolve, reject) => {
    cryto.randomBytes(rememberSize, async (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('base64'));
      }
    });
  });
};