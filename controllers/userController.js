/**
 * Express controller for user's
 * @module controllers/users
 * @requires Binance - node-binance-api
 */
import Binance from "node-binance-api";

/**
 * Express controller
 * @type {object}
 * @const
 * @namespace userController
 */
const userController = {};

/**
 * Setup binance's option and return the account infos
 * @function getAccount
 * @memberOf module:controllers/users~userController
 * @param {Object} req - request body
 * @param {Object} res - response body
 * @return {Promise<void>}
 */
userController.getAccount = async (req, res) => {
  const binance = new Binance().options({
    APIKEY: process.env.TRUE_API_KEY,
    APISECRET: process.env.TRUE_SECRET_API_KEY,
  });
  await binance
    .futuresAccount()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
};

export default userController;
