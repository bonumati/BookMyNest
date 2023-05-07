import { Router } from "express";
import * as adminData from "../data/admin";
const routes = Router();

routes.get("/users", adminData.getUsers);
routes.get("/properties", adminData.getProperties);
routes.get("/payments", adminData.getPayments);
routes.get("/bookings", adminData.getBookings);
export default routes;
