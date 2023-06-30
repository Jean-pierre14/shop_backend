import exp from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import dbConfig from "./config/mongodb.config.db.js";
import apiRouter from "./routes/index.routes.js";
import UserRouter from "./routes/User.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = exp();

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to api Racine molato" }).status(200);
});

app.use("/user", UserRouter);
app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

const Server = () => {
  app.listen(PORT, (err) => {
    if (err) throw err.message;
    console.log(`Server run on Port: http://localhost:${PORT}`);
    dbConfig();
  });
};

Server();
