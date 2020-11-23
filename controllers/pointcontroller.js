const router = require('express').Router();
const Log = require('../db').import('../models/points');
let drinkPoints = ""; //global var
let mealPoints = ""; //global var
let dessertPoints = ""; //global var

const validateSession = require('../middleware/validate-session');
const points = require('../models/points');

router.get('/', (req, res) => {
    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({
        error: err
    }));
});

//post points
//must use /log/post on postman
//it starts points to current (logged-in) user
router.post('/post', validateSession, (req,res) => {
    const logFromRequest = {
        typeOfPoint: req.body.typeOfPoint,
        numberOfPoints: req.body.numberOfPoints,
        owner:req.user.id,
    }

    Log.create(logFromRequest)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json(err))
})

router.get('/:name', (req, res) => {
    Log.findOne({ where: { typeOfPoint: req.params.name }})
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err}))
})


//update points
//use /log/update on postman
//it adds points to current (logged-in) user
router.put("/update", validateSession, function (req, res) {
    //getting current number of points from table
    Log.findOne({ where: { typeOfPoint:req.body.typeOfPoint }})
        .then(log => { 

        const updatePoints = {
            numberOfPoints: log.numberOfPoints+1
        };    
            Log.update(updatePoints,{ 
                where: {
                    owner: req.user.id,
                    typeOfPoint:req.body.typeOfPoint 
                 }
            })
            res.status(200).json(log) 
        })
        .catch((err) => res.status(500).json({ error: err })); 

});


//get all user points
//use log/stats/{id number}
router.get("/stats/:id", (req, res) => {
    Log.findAll({ where: { owner: req.params.id } })
        .then(points => {
            res.status(200).json(points)

            // vars below access json points result
            //drinkPoints = points[0].numberOfPoints;
            // mealPoints = points[1].numberOfPoints;
            // dessertPoints = points[2].numberOfPoints;
            //console.log(drinkPoints); //this works
        })
        .catch(err => res.status(500).json({ error: err }))
});


//delete points
//use log/delete/{id number}
router.delete('/delete/:id', validateSession, (req, res) => {
    Log.destroy({ where: { id: req.params.id } })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }))
})

module.exports = router;