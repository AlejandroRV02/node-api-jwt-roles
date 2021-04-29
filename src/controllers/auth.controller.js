import User from '../models/User';
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import config from '../config';

export const signUp = async (req, res) => {
    const {username, email, password, roles} = req.body;

    //Verify if the user already exists



    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id);
    }else{
        const userRole = await Role.findOne({name:'user'});
        newUser.roles = [userRole._id];
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({id:savedUser._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.json({token});

}


export const signIn = async (req, res) => {

    const userFound = await User.findOne({email: req.body.email})
    if(!userFound){
        return res.status(400).json({msg:"User not found"})
    }

    if (! await User.comparePasswords(req.body.password, userFound.password)){
        return res.status(401).json({msg:"Passwords do not match"})
    }

    const token = jwt.sign({_id:userFound._id}, config.SECRET, {expiresIn: 86400})

    res.json({token})
}