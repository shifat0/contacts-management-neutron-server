import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import contactRouter from "./routes/contacts.js";

const app = express();
dotenv.config();

// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//   } catch (error) {
//     throw error;
//   }
// };

//Middlewears
app.use(express.json());
app.use(cors());
const api = process.env.API;

app.use(`${api}/contacts`, contactRouter);

// mongoose.connection.on("disconnected", () =>
//   console.log("mongoDB disconnected")
// );
// mongoose.connection.on("connected", () => console.log("mongoDB connected"));

// app.listen(process.env.PORT, () => {
//   connect();
//   console.log(`Listening on Port ${process.env.PORT}`);
// });

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err.message));

app.listen(process.env.PORT, () => console.log(api));
