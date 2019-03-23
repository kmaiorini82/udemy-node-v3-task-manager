const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // findOne instead of findById so we can search for user by id and by token
        // being passed.  tokens.token searches array of tokens for existence of
        // token passed.
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        
        // No user found throw error to fall into catch block
        if (!user) {
            throw new Error()
        }

        // Store user on req object so app doesn't have to search
        // for it again
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth