const express = require('express')

// Runs local mongoose file but don't need 
// to save to a value to be reused.
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// Generic uploader
// const multer = require('multer')
// const upload = multer({
//     dest: 'images'
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })

// Using middleware

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.status(405).send()
//     } else {
//         next()
//     }
// })

// Parses incoming json and converts to an object
app.use(express.json())

// Routers
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

// Tests

// JSON Web Tokens

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')

//     console.log(data)
// }

// myFunction()

// Mongoose object relational mapping

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     const task = await Task.findById('5c954dcebaba6745687d5fe0')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)

//     const user = await User.findById('5c954ce26da1133eccceb824')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()

