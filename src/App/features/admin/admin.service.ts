import AppError from "../../Error/AppError";
import { IAuthRegister } from "../Auth/auth.interface";
import userModel from "../Auth/auth.model";

const updateUserIntoDb = async (id: string, payload: Partial<IAuthRegister>) => {
    const isUserExits = await userModel.findById(id);

    if (!isUserExits) {
        throw new AppError(404, 'User not found');
    }


    const user = await userModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return user;
}


const getAllUsersFromDb = async () => {
    const users = await userModel.find();
    return users;
}
export const AdminService = {
    updateUserIntoDb, getAllUsersFromDb
}


