const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.model.js');

///////////////////////ROUTES////////////////////////////

//Start new session
router.post('/', (req,res) => {
	Admin.findOne({username:req.body.username}, (err, foundAdmin) => {
		if(bcrypt.compareSync(req.body.password, foundAdmin.password)){
            req.session.currentUser = foundAdmin;
            res.status(201).json({
              status:201,
              message:'session created',
			  data:{ sessionUser: req.session.currentUser }
            });
        } else {
            res.status(401).json({
              status: 401,
              message:'login failed'
            });
        }
	});
});

//Create new admin
router.post('/add', async (req, res)=>{
	try {
		req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
		const createdAdmin = await Admin.create(req.body)
		req.session.currentUser = createdAdmin;
		res.status(201).json({
			status:201,
			message: 'New admin successfully created',
			data : { createdAdmin: createdAdmin }
		});
	} catch (error) {
		res.status(400).json({error: error.message});
	}
});

//Edit Admin Account


//Delete Admin Account


module.exports = router;
