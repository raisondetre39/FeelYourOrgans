import { Role } from '../extension/role';
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

