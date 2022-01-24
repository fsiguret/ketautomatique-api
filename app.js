import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import orderRoutes from "./routes/orderRouter.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

//Setup the .env file
dotenv.config();

// Database connection
mongoose
  .connect(process.env.ACCESS_MONGODB_CONNECT)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//Setup the header, same origin config etc...
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-Content-Type-Options"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.disable("x-powered-by");

//use json body
app.use(express.json());

//ROUTES
app.use("/api/order", orderRoutes);
app.use("/api/account", userRoutes);
app.all(/.*/, function (req, res, next) {
  res.status(404).json({ message: "Désolé, cette adresse n'existe pas." });
});

export default app;
