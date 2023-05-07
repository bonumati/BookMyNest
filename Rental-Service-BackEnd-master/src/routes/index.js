import { Router } from "express";
import UserRoutes from "./users";
import PropertyRoutes from "./properties";
import PaymentRoutes from "./payment";
import AdminRoutes from "./admin";
const routes = new Router();

routes.use("/users", UserRoutes);
routes.use("/property", PropertyRoutes);
routes.use("/payment",PaymentRoutes);
routes.use("/admin", AdminRoutes);

routes.all("*", (req, res, next) =>
  res.status(404).send({
    code: 404,
    message: "URL not found",
  })
);

export default routes;
