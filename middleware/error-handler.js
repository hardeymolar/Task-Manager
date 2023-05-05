const {CustomAPIError} = require('../errors/custom-error')

const errorHandlerMiddleware = (err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg:'something wnt wrong, please try again'})
}

module.exports = errorHandlerMiddleware