export interface IAuth {
    status?: 'active' | 'blocked'
    isDeleted?: boolean
    email: string
    password: string
    role?: 'admin' | 'user'
}
export interface IAuthRequestPasswordReset {
    email: string
}
export interface IAuthChangePassword {
    passwordChangedAt: Date
    password: string
    email: string
    oldPassword: string,
    newPassword: string,

}
export interface IAuthResponse {
    accessToken: string
    refreshToken: string
}
export interface IAuthRegister {
    email: string
    password: string
    name: string
    phone: string
    passwordChangedAt?: Date;
    role: ' admin' | 'user';
    status: 'active' | 'blocked';
    isDeleted: boolean;
    address: string,
    profileImage: string,
    passwordResetExpires: string,
    passwordResetToken: string
}

