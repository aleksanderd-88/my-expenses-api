const models = require('../../../../models')
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
  const id = req.params.id

  // Sanity check
  if ( !id )
    return res.status(404).send(`Id not found`)
  
  const user = await models.User.findById({ _id: id })
  if ( !user )
    return res.status(401).send(`No access`)

  try {
    //- Convert document to object
    const parsedUser = user.toObject()

    //- Generate token and send back to client
    const token = user.generateToken(parsedUser) 
    res.status(200).send({ ...parsedUser, token })
  } catch (error) {
    return res.status(403).send(`Error: ${ error }`)
  }
}