
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    itemName: {type:String, unique: true},
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
    deliveryCharges: {type: Number, default:0},
    taxAmount: {type: Number, default:0},
    createdBy: {type : String, required: true},
    approverEmail: {type : String, required: true},
    createDate:{type:Number, timestamps: true, required: true},
    updateDate:{type:Number, timestamps: true, required: true},
    status: { type: String, default: 'Pending' }
  });
  
module.exports = mongoose.model('Purchases',purchaseSchema)