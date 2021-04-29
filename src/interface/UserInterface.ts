export interface IUser {
    id: number;
    profileImage: string;
    firstname: string;
    lastname: string;
    country: string;
    email: string;
    password: string;
    newPassword?: string;
}