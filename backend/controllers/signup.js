const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const signupRouter = require('express').Router()
const User = require('../models/user')

signupRouter.post('/', async (request, response) => {
  try {
    const { firstName, lastName, email, password, address } = request.body.data
    console.log(request.body.data)
    const lat = request.body.lat
    const lng = request.body.lng

    if (!firstName || !lastName || !email || !password || !address) {
      console.log(firstName, lastName, email, password, address)
      return response.status(400).json({ error: 'missing fields' })
    }

    //check if email already exists
    const existing = await User.findOne({ email: email })
    if (existing) {
        return response.status(400).json({ error: 'email already exists' });
    }
    console.log(existing)

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ firstName, lastName, email, passwordHash, address, lat, lng })

    const newUser = await user.save()
    
    const userForToken = {
        email: user.email,
        id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET);


    response.status(201).json({Authorization: token, user: newUser})
  } catch (error) {
        response.status(400).json({ error: error.message })
    }
})


module.exports = signupRouter