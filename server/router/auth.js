const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.send('Hello from server')
});

router.post('/register', async (req, res) => {
    let { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(400).json({ error: `Fill every feild.` })
    }

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(400).json({ error: `user exists already.` })
        } else if (password !== cpassword) {
            return res.status(400).json({ error: `Passwords don't match` })
        }

        const user = new User({ name, email, phone, work, password, cpassword })

        const userRegister = await user.save();

        if (userRegister) {
            return res.status(201).json({ message: `user created successfully.` })
        }


    } catch (err) {
        return console.log(err)
    }
});


router.post('/signin', async (req, res) => {
    try {

        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: `Fill every feild.` })
        }

        const userLogin = await User.findOne({ email: email });


        if (!userLogin) {
            return res.status(400).json({ error: `Invalid credentials.` })
        }

        const isMatch = await bcrypt.compare(password, userLogin.password);

        if (!isMatch) {
            return res.status(403).json({ error: `Invalid credentials.` })
        }

        let token = await userLogin.generateAuthToken();
        // console.log(token);

        res.cookie('jwtoken',token,{
            expires : new Date(Date.now()+ 25892000000),
            httpOnly :true
        });

        return res.status(200).json({ error: `successfully logged in!` })

    } catch (error) {
        return console.log(error)
    }
});


module.exports = router;