const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({})
        response.json(users)
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
    })

usersRouter.get('/:userId', async (request, response) => {
    try {
        const token = request.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(request.params.userId)
        response.status(200).json({user: user})
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})
    
module.exports = usersRouter;




