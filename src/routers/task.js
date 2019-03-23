const express = require('express')
const router = new express.Router()

const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
    // task.save().then((result) => {
    //     if(!result || result.length <= 0) {
    //         return res.status(400).send()
    //     }
    //     res.status(201).send(result)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
//      limit = number of records to return
//      skip = number of records to ski;
// GET /tasks?sortBy=createdAt:desc

router.get('/tasks', auth, async (req, res) => {

    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        //const tasks = await Task.find({})
        await req.user.populate({
            path: 'tasks',
            match, 
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     createdAt: -1 // 1 - asc -1 - desc
                // }
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }

    // Task.find({}).then((result) => {
    //     if(!result || result.length <= 0) {
    //         return res.status(404).send()
    //     }
    //     res.status(201).send(result)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

router.get('/tasks/:_id', auth, async (req, res) => {
    const {_id} = req.params

    try {
        //const task = await Task.findById(id)
        const task = await Task.findOne({
            _id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    
    } catch (error) {
        res.status(500).send(error)
    }
    
    // Task.findById(id).then((task) => {
    //     if(!task) {
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(task)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

router.patch('/tasks/:_id', auth, async (req, res) => {
    const {_id} = req.params
    const {body} = req

    const updates = Object.keys(body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid operation!' })
    }

    try {
        //const task = await Task.findByIdAndUpdate(id, body, { new: true, runValidators: true })

        const task = await Task.findOne({
            _id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = body[update])
        await task.save()

        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:_id', auth, async (req, res) => {
    const {_id} = req.params

    try {
        const task = await Task.findOneAndDelete({
            _id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send(task)
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router