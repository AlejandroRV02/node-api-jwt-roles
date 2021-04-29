import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (req, res, next) => {
    try{

        
        const token = req.headers["x-access-token"];
        
        if(!token) return res.status(403).json({msg:'No token provided'})
        
        const decoded = jwt.verify(token, config.SECRET);
        
        req._id = decoded._id;

        const isUser = await User.findById(decoded._id, {password:0});
        
        if(!isUser) return res.status(404).json({msg:'User not found'})
        
        next();
    }
    catch(error){
        return res.status(404).json({msg:'A problem ocurred'})
    }
}

export const isAdmin = async(req, res, next) => {
    
}

export const isModerator = async(req, res, next) => {
    const isUser = await User.findById(req._id);
    const roles = await Role.find({_id:{$in: isUser.roles}})
    
    for (let i=0; i<roles.length; i++){
        if (roles[i].name === "MODERATOR"){
            next();
            return;
        }
    }
    
    return res.status(401).json({msg:"Unauthorized"});
}