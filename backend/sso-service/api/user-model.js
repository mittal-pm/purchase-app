
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    role: { type:String, enum: ["General","Manager"], default: "General"},
    createDate:{type:Number, timestamps: true, required: true},
  });
  
module.exports = mongoose.model('Users',userSchema)