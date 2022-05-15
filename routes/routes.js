const express = require('express');
const res = require('express/lib/response');
//const { collection } = require('../models/model');
const Model = require('../models/model');
const router = express.Router();
const bodyParser=require ('body-parser');

// router.use(bodyParser.json());

    //     //-- -- -- -- -- -- -- -- -- -- -- - post type working(success)-- -- -- -- -- -- -- -- -- -- -

router.post('/postNew', (req, res) => {
        console.log("hi", req.body);
        Model.create({
            name: req.body.name,
            email: req.body.email,
        }, function(err, result) {

            if (err) return res.send({ "status": false, "message": err })
            return res.send({ "status": true, "message": "The User's account successfully created" ,"Result":result});
        })
    })
    //     //-- -- -- -- -- -- -- -- -- -- -- - get type working(success)-- -- -- -- -- -- -- -- -- -- -

router.get('/:postId', async(request, response) => {
        Model.find({
            "_id": request.params.postId
        }, (error, result) => {
            console.log("test", result);
            if (result) {

                return response.send({ "status": true, "message": "record found", "Result": result });
            }
            return response.status(500).send(error);
            //response.send(result);
        })
    })

   
         //--------------------------------delete method working(success)----------------------------
router.delete('/:postId', async(request, response) => {
    Model.findByIdAndDelete({
        "_id": request.params.postId
    }, (error, result) => {
        console.log("test", result);
        if (result) {

            return response.send({ "status": true, "message": "record deleted successfully", "Result": result });
        }
        return response.status(500).send(error);

    })
})

//------------------update  working(success)------
router.patch('/:postId', async(req, res) => {

    Model.updateOne({
            _id: req.params.postId
        }, {
            $set: {
                name: req.body.name,
                email: req.body.email

            },
        },
        function(err, callback) {

            if (err) return res.send({ "status": false, "message": err })
            return res.send({ "status": true, "message": "The User's account successfully updated", "Result": callback });

        }
    )
});

//    -----------------------------put working(success)-------------------
router.put('/:postId', async(req, res) => {

    Model.findOneAndUpdate({
            _id: req.params.postId
        }, {
            $set: {
                name: req.body.name,
                email: req.body.email

            },
        },
        function(err, callback) {

            if (err) return res.send({ "status": false, "message": err })

            return res.send({ "status": true, "message": "The User's account successfully updated", "Result": callback });
        }
    )
})
module.exports = router;


