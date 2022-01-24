import mongoose from "mongoose";

const ordersSchema = mongoose.Schema({
  buyer: { type: Boolean, required: true },
  commission: { type: Number, required: true },
  commissionAsset: { type: String, required: true },
  id: { type: Number, required: true },
  maker: { type: Boolean, required: true },
  orderId: { type: Number, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  quoteQty: { type: Number, required: true },
  realizedPnl: { type: Number, required: true },
  side: { type: String, required: true },
  positionSide: { type: String, required: true },
  symbol: { type: String, required: true },
  time: { type: Number, required: true },
});

export default mongoose.model("Order", ordersSchema);
