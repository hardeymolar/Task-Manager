const Task = require('../models/task')
const {createCustomError} = require('../errors/custom-error')
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper( async (req,res)=>{
        const task = await Task.find({})
        res.status(200).json({task})
})
const createTask = asyncWrapper( async (req,res)=>{
        const task = await Task.create(req.body)
        res.status(201).json({task})
})
const getTask = asyncWrapper( async (req,res)=>{
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID});
        if(!task){
            return next(createCustomError(`No task with the id: ${taskID}`,404))
        }
        res.status(200).json({task})
})
const deleteTask = asyncWrapper( async (req,res)=>{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return next(createCustomError(`No task with the id: ${taskID}`,404))
        }
        res.status(200).json({task})
})
const updateTask = asyncWrapper( async (req,res)=>{
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body,{
            runValidators:true,
            new:true
        });
        if(!task){
            return next(createCustomError(`No task with the id: ${taskID}`,404))
        }
        res.status(200).json({task});
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}