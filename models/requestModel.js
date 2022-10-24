const mongoose = require('mongoose')

const {studentSchema} = require('./StudentModel')
const {adminSchema} = require('./adminModel')


const requestSchema = new mongoose.Schema({
    flightDate: {
       type: Date,
       default: Date.now
    },
    isApproved: {
       type: Boolean,
       default: false
    },
    requestedDate:  {
       type: Date,
       default: Date.now
    },
    adminVerifiedDate: {
       type: Date,
       default: Date.now
    },
    requestedStudent: studentSchema,
    approvedAdmin: adminSchema,
    isRejected: {
      type: Boolean,
      default: false
   },
    //isExpired
   isExpired: {
      type: Boolean,
      default: false
   },
   reason: {
      type: String,
      default: "NA"
   },

   // requestedStudent:  mongoose.Schema.Types.ObjectId,
   // approvedAdmin:  mongoose.Schema.Types.ObjectId,
 })


 module.exports = {
    requestModel:  mongoose.model('request', requestSchema, 'request'),
    requestSchema: requestSchema
 }
