import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_EXPIRES, JWT_SECRET} from "../config/env.js";

export interface JwtPayload{
    user:string
}

export const generateToken = (user:string):string=>{
    return jwt.sign({user},JWT_SECRET,{expiresIn:JWT_EXPIRES})
}

export const verifyToken = (token:string):JwtPayload=>{
    return jwt.verify(token,JWT_SECRET) as JwtPayload
}