/**
 * Express controller for user Orders
 * @module controllers/orders
 * @requires Orders - Mongoose model
 * @requires Binance - node-binance-api
 */
import Orders from "../models/Orders.js";
import Binance from "node-binance-api";

/**
 * Express controller
 * @type {object}
 * @const
 * @namespace orderController
 */
const orderController = {};

/**
 * Get the user trades from binance API, format the response to match with mongoose modeland save in mongoDB
 * @function addOrders
 * @memberOf module:controllers/orders~orderController
 * @param {Object} req - request body
 * @param {Object} res - response body
 * @return {Promise<void>}
 */
orderController.addOrders = async (req, res) => {
  let historyOrdersPending = [];
  let historyOrders = [];

  //Setup Binance's options
  const binance = new Binance().options({
    APIKEY: process.env.TRUE_API_KEY,
    APISECRET: process.env.TRUE_SECRET_API_KEY,
  });
  const exchangeInfo = await binance.futuresExchangeInfo();

  //ALL symbols
  /**
   * This API can't get ALL symbol in one request... So need to tricks for done this one
   * in as little time as possible...
   */
  exchangeInfo.symbols.forEach((info) => {
    const orders = binance.futuresUserTrades(info.symbol);
    historyOrdersPending.push(orders);
  });

  for (const promise of historyOrdersPending) {
    const orders = await promise;

    if (orders[0]) {
      orders.forEach((order) => {
        historyOrders.push(order);
      });
    }
  }

  //get all orders in DB. If they have one order. delete the collection and recreate. !!!! NEED TO BE CHANGED
  //TODO:CHANGE THE DELETE MANY
  const currentHistory = await Orders.find({});

  if (currentHistory.length === 0) {
    Orders.create(historyOrders)
      .then(() => res.status(201).json({ message: "Orders has been saved" }))
      .catch((err) => res.status(500).json({ message: err }));
  } else {
    Orders.deleteMany()
      .then(() => {
        Orders.create(historyOrders)
          .then(() =>
            res.status(201).json({ message: "Orders has been saved" })
          )
          .catch((err) => res.status(500).json({ message: err }));
      })
      .catch((err) => res.status(500).json({ message: err }));
  }
};

/**
 * Find all orders in mongoDB and return them
 * @function getOrders
 * @memberOf module:controllers/orders~orderController
 * @param {Object} req - request body
 * @param {Object} res - response body
 * @return {Promise<void>}
 */
orderController.getOrders = async (req, res) => {
  await Orders.find({})
    .then((response) => res.status(200).json({ orders: response }))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "ERROR Orders.find() -mongoose-", error: err })
    );
};

export default orderController;
