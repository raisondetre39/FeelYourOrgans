export interface IIndicatorInfo {
    name: string;
    maxIndicatorValue: number;
    minIndicatorValue: number;
    description: string;
    id: number;
}

export interface IIotIndicator {
    iotId: number;
    indicatorId: number;
    records: IIndicatorValue[];
    id: number;
}

export interface IIndicatorValue {
    iotIndicatorId: number;
    value: number;
    recordDate: string;
    isCritical: boolean;
    userId: number;
    id: number;
}

export interface IDotValue {
    dataNumber: number;
    labelName: string;
}

export interface IIndicatorList {
    display: boolean;
    id: number;
    indicatorData: IDotValue[];
}

