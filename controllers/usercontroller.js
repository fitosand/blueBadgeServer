const router = require('express').Router();
const User = require('../db').import('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// sign up POST
router.post("/signup", (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12)
    })
        .then(user => {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "365d"})

            res.json({
                user: user,
                message: "user was created successfully",
                sessionToken: token
            })
        })
        .catch(err => res.status(500).send(err))
})

router.post('/signin', (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if (matches) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "365d" });

                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        })
                    } else{
                        res.status(502).json({ error: 'password mismatch' });
                    }
                })

            } else {
                res.status(500).json({error: 'user not found'})
            }

        })
        .catch(err => res.status(500).json({error: 'error with database'}))
});



// update user account --- still in progress (J)
router.put("/updateuser", (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12)
    })
        .then(user => {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "365d"})

            res.json({
                user: user,
                message: "user was created successfully",
                sessionToken: token
            })
        })
        .catch(err => res.status(500).send(err))
})


//delete user account --- still in progress (J)

router.delete('/deleteuser', (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if (matches) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "365d" });

                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        })
                    } else{
                        res.status(502).json({ error: 'password mismatch' });
                    }
                })

            } else {
                res.status(500).json({error: 'user not found'})
            }

        })
        .catch(err => res.status(500).json({error: 'error with database'}))
});

module.exports = router;