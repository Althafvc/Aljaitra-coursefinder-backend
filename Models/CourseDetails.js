const mongoose = require('mongoose')

const schema = {
    COURSENAME: {
        type:String,
    },
    COLLEGES : {
        type:Array
    },
    SPECIFICATIONS : {
        type:Array
    },
    FEESAMOUNT: {
        type:Array
    },
    LOCATIONS: {
        type:Array
    }
}

const courseDataSchema = new mongoose.Schema(schema)
const courseDataModel = new mongoose.model('CourseDatas',courseDataSchema)

module.exports = courseDataModel
