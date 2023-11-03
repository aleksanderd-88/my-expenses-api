const getVersion = require('../../../utils/getVersion')

module.exports = (req, res) => {
  try {
    const version = getVersion()
    return res.status(200).send({ version: version })
  } catch (error) {
    res.status(500).send('Could not get application version')
  }
}