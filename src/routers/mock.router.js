import express from "express";
import { Router } from "express";

import { getProductsMocked } from "../controllers/product.controller.js";

mocksRouter.use(express.json());
mocksRouter.use(express.urlencoded({ extended: true }));

mocksRouter.get("/", getProductsMocked);

export const mocksRouter = Router();