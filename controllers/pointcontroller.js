const router = require('express').Router();
const Log = require('../db').import('../models/points');

const validateSession = require('../middleware/validate-session');

router.get('/', (req, res) => {
    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({
        error: err
    }));
});

//post points

router.post('/post', validateSession, (req,res) => {
    const logFromRequest = {
        typeOfPoint: req.body.typeOfPoint,
        numberOfPoints: req.body.numberOfPoints,
<<<<<<< HEAD
        owner: req.user.id
=======
        owner:req.user.id,
>>>>>>> c54a50ebcefd9e848e9f343f52a343f472cde52e
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

//delete points

router.delete('/:id', validateSession, (req, res) => {
    Log.destroy({ where: { id: req.params.id } })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }))
})

module.exports = router;