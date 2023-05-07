import { Router } from "express";
import * as PropertyData from "../data/properties";
import upload from "../config/multer";
import { verify } from "../services/auth";
const routes = Router();

routes.post("/", verify, upload.array("files"), PropertyData.addNewProperty);
routes.get("/", PropertyData.getAllProperties);
routes.get("/user/:userId", verify, PropertyData.getMyProperties);
routes.get("/:id", PropertyData.getPropertyDetail);
routes.post("/:id/book", verify, PropertyData.bookProperty);

export default routes;
