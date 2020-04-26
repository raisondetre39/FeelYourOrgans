import { ILimbInfo } from './limb.interface';
import { IIotIndicator } from './indicator.interface';

export interface IOTInfo {
    name: string;
    limb: ILimbInfo;
    limbId: number;
    iotIndicators: IIotIndicator[];
    id: number;
}

export interface IOTCreate {
    name: string;
    limbId: number;
    iotIndicators: any;
}
