/**
 * Express router providing user's related routes
 * @module routers/users
 * @requires express
 * @requires userController
 */
import express from "express";
import userController from "../controllers/userController.js";

/**
 * Express router to mount user's related functions.
 * @type {object}
 * @const
 * @namespace usersRouter
 */
const usersRouter = express.Router();

/**
 * Route for get user's account info
 * @name get/
 * @function
 * @memberOf module:routers/users~usersRouter
 * @param {string} path - Express path "/"
 * @param {callback} controller - getAccount from userController
 */
usersRouter.get("/", userController.getAccount);

export default usersRouter;
