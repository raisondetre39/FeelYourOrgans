import { IOTInfo } from './iot.interface';

export interface IUser {
    token?: string;
    isAdmin: boolean;
    userId: number;
}

export interface IUserInfo {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: number;
    id: number;
}

export interface ICreateUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    IotId: number;
}

export interface IFullUserInfo {
    email: string;
    firstName: string;
    lastName: string;
    iot: IOTInfo;
    iotId: number;
    isAdmin: boolean;
    id: number;
}

export interface IUpdateUser {
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
}
