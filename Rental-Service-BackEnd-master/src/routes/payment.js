import { Router } from "express";
import * as PaymentData from "../data/payment";

// const stripe=process.env.STRIPE_SECRET_KEY;

const routes = Router();
//console.log("In payment.js")

routes.post("/",PaymentData.savePayment);
export default routes;
