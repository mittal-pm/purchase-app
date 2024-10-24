
const Joi = require('joi');

function  validateUsingJoi(schemaName, req, res, next){
    const { error } = schemaName.validate(req.body);
    if (error) {
    // Send error response if validation fails
    return res.status(400).send({ message: error.details[0].message });
    }
    next()
}

exports.validateCreatePurchaseRequest = function (req, res, next){
    const purchaseSchema = Joi.object({
        itemName: Joi.string().min(3).max(50).required(),
        quantity: Joi.number().integer().positive().required(),
        unitPrice: Joi.number().positive().required(),
        totalPrice: Joi.number().positive().required(),
        deliveryCharges: Joi.number().positive().optional(),
        taxAmount: Joi.number().positive().optional(),
        approverEmail: Joi.string().email().required() , // Ensure valid email
        createdBy: Joi.string().min(3).max(50).required(),
      });
    validateUsingJoi(purchaseSchema,req, res, next)
}

exports.validateUpdatePurchaseRequest = function (req, res, next){
    const updateSchema = Joi.object({
        status: Joi.string().min(3).max(50).required(),
        approverEmail: Joi.string().email().required()  // Ensure valid email
      });
    validateUsingJoi(updateSchema,req, res, next)
}

exports.validatefindPurchaseRequest = function (req, res, next){
    const findSchema = Joi.object({
        _id: Joi.string().min(3).max(50).optional(),
        createdBy: Joi.string().min(3).max(50).optional(),
        status: Joi.string().min(3).max(50).optional(),
        approverEmail: Joi.string().email().optional()  // Ensure valid email
      });
    validateUsingJoi(findSchema,req, res, next)
}