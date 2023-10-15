const models = require('../../../../models')
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
  const data = req.body.data

  // Sanity check
  if ( !data || !Object.keys(data).length || Object.values(data).some(o => o === '') )
    return res.status(400).send(`Can't continue with request`)
  
  const user = await models.User.findOne({ email: data.email })
  if ( !user )
    return res.status(404).send(`User not found`)

  //- Compare password given with stored password in DB
  const passwordMatch = await bcrypt.compare(data.password, user.password)
  if ( !passwordMatch )
    return res.status(404).send(`Incorrect password`)

  try {
    //- Convert document to object
    const parsedUser = user.toObject()

    //- Generate token and send back to client
    const token = user.generateToken(parsedUser) 
    res.status(201).send({ ...parsedUser, token })
  } catch (error) {
    return res.status(500).send(`Error: ${ error }`)
  }
}