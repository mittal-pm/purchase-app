const express = require('express');
const purchaseModel = require('./purchase-model');
const { validateCreatePurchaseRequest, validateUpdatePurchaseRequest, validatefindPurchaseRequest } = require('./request-validator');
const router = express.Router();
const axios = require('axios'); 

// API to create a new purchase request
router.post('/create-purchase', validateCreatePurchaseRequest, async (req, res, next) => {
    try{
        const response = await axios.post(process.env.AUTH_SERVICE_URL + '/user', {
            email: [req.body.approverEmail]
          });
        if(response.data.users.length==0) throw new Error('Please send a valid Manager Email')
        let requestBody = req.body
        requestBody.createDate = Date.now()
        requestBody.updateDate = Date.now()
        const newPurchase = new purchaseModel(requestBody);
        await newPurchase.save();
        res.status(200).json({message:'Purchase request created Successfully'});
        sendCreatePurchaseOrderMails(requestBody.createdBy, requestBody.approverEmail, requestBody.itemName)
    }catch(e){
        next(e)
    }

});

async function sendCreatePurchaseOrderMails(requesterEmail, approverEmail, puchaseName){

    const users = await axios.post(process.env.AUTH_SERVICE_URL + '/user', {
        email:[requesterEmail, approverEmail]
      });

    let requesterName
    let approverName
    users.data.users.forEach(user => {
        if(user.email===requesterEmail){
            requesterName = user.name
        }
        if(user.email===approverEmail){
            approverName = user.name
        }
    });

    await axios.post(process.env.NOTIFICATIONS_SERVICE_URL, {
        email: approverEmail,  // Send notification to the logged-in user
        subject: 'New Purchase Request Approval',
        message:  "<p>I hope this message finds you well! <br>We wanted to let you know that a purchase request have been recently added and is waiting for your approval.<br>Thank you for your continued support and attention to this matter.</p>",
        title:  `Purchase ${puchaseName} Approval Request`,
        name: approverName
      });

    await axios.post(process.env.NOTIFICATIONS_SERVICE_URL, {
    email: requesterEmail,  // Send notification to the logged-in user
    subject: 'New Purchase Request Created Successfully',
    message:  `<p>We hope you’re doing well! <br> We wanted to inform you that your purchase request ${puchaseName} has been created successfuly. Please login to your account to know more about your purchase request.</p>`,
    title:  `Purchase ${puchaseName} Created`,
    name: requesterName
    });
}

// API to approve purchase request
router.post('/approve-purchase/:itemName', validateUpdatePurchaseRequest,async (req, res, next) => {
    try{
        const requestBody = req.body
        let purchase = await purchaseModel.find({itemName: req.params.itemName});
        if(purchase.length===0) throw new Error('Request not Found')
        purchase = purchase[0]
        if(purchase.approverEmail!==requestBody.approverEmail) throw new Error('You are not Authorized to Update this Request')
        purchase.status = requestBody.status
        purchase.updateDate = new Date();
        await purchase.save();
        res.status(200).json({message:'Purchase updated Successfully'});

        await sendUpdatePurchaseOrderMails(purchase.createdBy, purchase.approverEmail, purchase.itemName, requestBody.status )
    }catch(e){
        next(e)
    }

});

async function sendUpdatePurchaseOrderMails(requesterEmail, approverEmail, puchaseName, status){

    const users = await axios.post(process.env.AUTH_SERVICE_URL + '/user', {
        email:[requesterEmail, approverEmail]
      });

    const message = status==="approved"? "been approved": "unfortunately failed"
    let requesterName
    let approverName
    users.data.users.forEach(user => {
        if(user.email===requesterEmail){
            requesterName = user.name
        }
        if(user.email===approverEmail){
            approverName = user.name
        }
    });

    await axios.post(process.env.NOTIFICATIONS_SERVICE_URL, {
        email: approverEmail,  // Send notification to the logged-in user
        subject: 'Update on Your Purchase Request',
        message:  "<p>I hope this message finds you well! <br>We wanted to let you know that the status of the purchase request you recently handled has been successfully updated.<br>Thank you for your continued support and attention to this matter.</p>",
        title:  `Purchase ${puchaseName} Updated`,
        name: approverName
      });

    await axios.post(process.env.NOTIFICATIONS_SERVICE_URL, {
    email: requesterEmail,  // Send notification to the logged-in user
    subject: 'Update on Your Purchase Request',
    message:  `<p>We hope you’re doing well! <br> We wanted to inform you that your purchase request has ${message}. Please login to your account to know more about your purchase.</p>`,
    title:  `Purchase ${puchaseName} Updated`,
    name: requesterName
    });
}

// API to fetch request
router.post('/get-purchase', validatefindPurchaseRequest, async (req, res, next) => {
    try{
        const purchases = await purchaseModel.find(req.body);
        return res.status(200).send({purchases: purchases});
    }catch(e){
        next(e)
    }

});


module.exports = router