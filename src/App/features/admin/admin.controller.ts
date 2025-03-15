import { Request, Response } from "express";
import CatchAsync from "../../utils/CatchAsync";
import { AdminService } from "./admin.service";

const updateUser = CatchAsync(async (req: Request, res: Response) => {

    const result = await AdminService.updateUserIntoDb(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result
    })
})
const getAllUsers = CatchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.getAllUsersFromDb();
    res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        data: result
    });
})



export const AdminController = {
    updateUser, getAllUsers,
}

