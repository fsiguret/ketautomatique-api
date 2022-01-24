import Binance from "node-binance-api";

const orderController = {};

orderController.getAccount = async (req, res) => {
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

export default orderController;
