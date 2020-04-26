import { ILimbInfo } from './limb.interface';

export interface IOTInfo {
    name: string;
    limb: ILimbInfo;
    limbId: number;
    iotIndicators: any;
    id: number;
}

export interface IOTCreate {
    name: string;
    limbId: number;
    iotIndicators: any;
}
