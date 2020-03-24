import { BaseObject } from './base';

export interface Inventory extends BaseObject {
    region: string;
    regnum: number;
    n95: number;
    surgmask: number;
    osetamivir: number;
    ppe: number;
    sanitizer: number;
    gloves: number;
}