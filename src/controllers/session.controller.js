import { verifyToken } from '../utils/jwt.js';


const userRegister = async(req, res) => {
    try {
        res.status(201).json({status: "success", payload: newUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: "error", msg: "Error interno del servidor!"});
    }
}

const userLogin = async(req, res) => {
    try{

        res.status(200).json({status: "success", payload: req.session.user});
    }catch(error){
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor!"});
    }
}

const userCheckToken = async(req, res) => {
    try {
        const token = req.cookies.token;
        const checkToken = verifyToken(token);
        if(!checkToken){
            return res.status(403).json({status: "error",  msg: "Invalid token"});
        }

        return res.status(200).json({status: "success", payload: checkToken});
    } catch (error) {
        res.status(500).json({status: "Error", msg: "Internal Server Errror"});
    }
}

const userGithubLogin = async(req, res) => {
    try {
        res.status(201).json({status: "success", payload: newUser});
    } catch (error) {
        res.status(500).json({status: "error", msg: "Error interno del servidor!"});
    }
}

const userLogout = async(req, res) => {
    try {
        req.session.destroy();

        res.status(200).json({ status: "success",  msg: "Sesion cerrada con exito!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor!"});
    }
}

export default {
    userRegister,
    userLogin,
    userCheckToken,
    userGithubLogin,
    userLogout
}