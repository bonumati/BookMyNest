import { Router } from "express";
import * as UserData from "../data/users";
import { verify } from "../services/auth";
const routes = Router();

routes.post("/signup", UserData.signup);
routes.get("/:id/bookings", verify, UserData.getAllBookings);
routes.get("/:id/manage/bookings", verify, UserData.getAllMyBookings);
export default routes;
