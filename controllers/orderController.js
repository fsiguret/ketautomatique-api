import Orders from "../models/Orders.js";
import Binance from "node-binance-api";

const orderController = {};

orderController.addOrders = async (req, res) => {
  let historyOrdersPending = [];
  let historyOrders = [];

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
