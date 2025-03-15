
import { Router } from "express";
import auth from "../../middleware/auth";
import { AdminController } from "./admin.controller";



const adminRouter = Router();
adminRouter.get('/users', AdminController.getAllUsers);
adminRouter.patch('/users/:id', auth('admin'), AdminController.updateUser);
// adminRouter.patch('/users/:id', auth('admin'), AdminController.updateUser);

export default adminRouter; 