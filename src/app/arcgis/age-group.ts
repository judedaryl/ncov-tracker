import { BaseObject } from './base';

export type AgeCategory = '1 to 10' | '11 to 20' | '21 to 30' | '31 to 40' | '41 to 50' | '51 to 60' | '61 to 70' | '71 to 80' | '81 to 90' | '91 to 100'

export type GenderGroup = 'Male' | 'Female';

export interface AgeGroup extends BaseObject {
    PH: string;
    age_categ: AgeCategory;
    age: number;
    sex: GenderGroup;
    FID: number;
}