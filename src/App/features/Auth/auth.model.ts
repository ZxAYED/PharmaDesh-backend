import { model, Schema } from "mongoose";

import { IAuthRegister } from "./auth.interface";

const userSchema = new Schema<IAuthRegister>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    profileImage: { type: String, required: true },
    passwordChangedAt: { type: Date, default: Date.now() },
    passwordResetExpires: { type: String },
    passwordResetToken: { type: String },
}, { timestamps: true })


userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});


// userSchema.pre('find', function (next) {
//     this.find({ isDeleted: false });
//     this.find({ status: 'active' });
//     next();
// })
const userModel = model<IAuthRegister>('User', userSchema);

export default userModel;
