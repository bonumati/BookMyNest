import express from "express";
import routes from "./routes";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.response.success = function (data) {
  this.status(200).send(data);
};

app.response.error = function (code, message) {
  message = typeof message != "string" ? "Something went wrong" : message;
  this.status(code).send({ code, error: message });
};

app.response.unauthorizedUser = function () {
  this.status(401).send({ error: "Unauthorized User" });
};

app.response.accessDenied = function () {
  this.status(401).send({ error: "Access Denied" });
};

app.use("/", routes);

app.listen(4000, () => {
  console.log("Yep this is working 🍺");
  console.log("We've now got a server 🦄");
  console.log(`App listen on port: ${4000} 🍕`);
  console.log(`Server Url:  http://localhost:${4000}`);
});
