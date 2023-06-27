import exp from "express";
import { json, urlencoded } from "body-parser";
import * as cors from "cors";

const app = exp();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to api Racine molato" }).status(200);
});

const Server = () => {
  app.listen(PORT, (err) => {
    if (err) throw err.message;
    console.log(`Server run on Port: http://localhost:${PORT}`);
  });
};

Server();
