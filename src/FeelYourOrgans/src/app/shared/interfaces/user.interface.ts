import { Role } from '../extension/role';

export interface IUser {
    token?: string;
    role: Role;
    id: number;
}

export interface ICreateUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    diseaseId: number;
}

export interface IUserPartialInfo {
    email: string;
    firstName: string;
    lastName: string;
    diseaseName: string;
    password: string;
    diseaseId: number;
    role: number;
    id: number;
}

export interface IUserInfo {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    device: IDeviceInfo;
    deviceId: number;
    disease: IDisease;
    diseaseId: number;
    role: number;
    id: number;
}

export interface IDisease {
    diseaseName: string;
    users: any;
    id: number;
}

export interface IUpdateUser {
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
}

export interface IDeviceInfo {
    deviceName: string;
    userId: number;
    deviceIndicators: IDeviceIndicator[];
    id: number;
}

export interface IDeviceIndicator {
    deviceId: number;
    indicator: IIndicatorInfo;
    indicatorId: number;
    indicatorValues: IIndicatorValue[];
    id: number;
}

export interface IIndicatorValue {
    deviceIndicatorId: number;
    value: number;
    date: string;
    id: number;
}

export interface IIndicatorInfo {
    indicatorName: string;
    maxValue: number;
    minValue: number;
    devices: [null];
    id: number;
}

