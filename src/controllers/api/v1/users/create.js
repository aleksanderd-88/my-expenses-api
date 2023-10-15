const models = require('../../../../models')
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
  const data = req.body.data

  // Sanity check
  if ( !data || !Object.keys(data).length || Object.values(data).some(o => o === '') )
    return res.status(400).send(`Can't continue with request`)
  
  //- Validate entered password
  if ( data.password !== data.verifiedPassword )
    return res.status(400).send(`Password didn't match`)

  //- Remove `verifiedPassword` prop since we don't need to store it in DB
  delete data.verifiedPassword

  //- Hash password before save
  data.password = await bcrypt.hash(data.password, 10)
  
  // Make the query
  return models.User.create(data)
    .then( async (user) => {
      //- Convert document to object
      const parsedUser = user.toObject()

      //- Generate token and send back to client
      const token = user.generateToken(parsedUser) 
      res.status(201).send({ ...parsedUser, token })
    })
    .catch(err => res.status(500).send(`Error: ${ err }`))
}