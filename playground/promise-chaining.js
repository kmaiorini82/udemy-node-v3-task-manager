require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

const deleteTaskAndCountWithCompletedState = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })
    return {task, count}
}

deleteTaskAndCountWithCompletedState('5c8811314d50be4b58d931e7', false).then((results) => {
    console.log('Results: ', results)
}).catch((error) => {
    console.log('Error: ', error)
})

// Task.findByIdAndDelete('5c8558476a7fe130149fde57').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log(error)
// })

// User.findByIdAndUpdate('5c855734e8b27d1ca0ab609a', { age: 37}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1})
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log(error)
// })

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, { age })
//     const count = await User.countDocuments({ age })

//     return {user, count}
// }

// updateAgeAndCount('5c855734e8b27d1ca0ab609a', 1).then((result) => {
//     console.log('Results:', result)
// }).catch((error) => {
//     console.log('Error: ', error)
// })