require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

/***
 * @param {express.Request} req 
 * @param {express.Response} res
 * @param {express.NextFunction} next  
 */
function auth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    if(!token) {
        return res.status(400).json({ msg: 'token required' });
    }
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if(!user) {
        return res.status(401).json({ msg: "incorrect token", });
    }
    res.locals.user = user;
    next();
}

module.exports = { auth };
