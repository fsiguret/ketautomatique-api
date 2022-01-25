/**
 * Express router providing order related routes
 * @module routers/orders
 * @requires express
 * @requires orderController
 */
import express from "express";
import orderController from "../controllers/orderController.js";

/**
 * Express router to mount order related functions.
 * @type {object}
 * @const
 * @namespace ordersRouter
 */
const ordersRouter = express.Router();

/**
 * Route for add orders in mongoDB
 * @name post/
 * @function
 * @memberOf module:routers/orders~ordersRouter
 * @param {string} path - Express path "/add"
 * @param {callback} controller - addOrders from orderController
 */
ordersRouter.post("/add", orderController.addOrders);

/**
 * Route for get orders from mongoDB
 * @name get/
 * @function
 * @memberOf module:routers/orders~ordersRouter
 * @param {string} path - Express path "/"
 * @param {callback} controller - getOrders from orderController
 */
ordersRouter.get("/", orderController.getOrders);

export default ordersRouter;
