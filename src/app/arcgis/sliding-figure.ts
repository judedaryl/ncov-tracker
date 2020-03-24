import { BaseObject } from './base';

export interface SlidingFigure extends BaseObject  {
    day: number;
    confirmed: number;
    PUIs: number;
    PUMs: number;
    recovered: number;
    deaths: number;
    tests: number;
}