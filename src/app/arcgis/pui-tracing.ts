import { BaseObject } from './base';

export interface PuiTracing extends BaseObject {
    region: string;
    hf: string;
    latitude: number;
    longitude: number;
    PUIs: number;
}