import { BaseObject } from './base';

export interface Confirmed extends BaseObject {
    date: number;
    admitted: number;
    recovered: number;
    deaths: number;
}