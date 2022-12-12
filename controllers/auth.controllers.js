const { User }  =  require('../models');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user  = await User.findOne({email});
        if(!user){
            return  res.status(400).json({msg: 'Email/Password incorrect'});
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword){
            return  res.status(400).json({msg: 'Email/Password incorrect -password'});
        }
        console.log(user.uid);
        const token = await generateJWT(user.uid);
        res.json({ user, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'speak to the admin'});
    }

}

module.exports = {

    login
}