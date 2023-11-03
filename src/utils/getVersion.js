const { version } = require('../../package.json')

module.exports = () => {
  if ( !version )  
    return null
  return version 
}