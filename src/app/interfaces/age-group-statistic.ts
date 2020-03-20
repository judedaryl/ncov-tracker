import { GenderGroup, AgeGroup } from './arcgis';

export interface AgeGroupStatistic {
    gender: GenderGroup;
    categories: AgeGroupCategory[]
}

export interface AgeGroupCategory {
    category: AgeGroup;
    value: number;
}