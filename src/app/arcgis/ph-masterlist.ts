import { BaseObject } from './base';

export interface PHCase extends BaseObject{
    FID: number;
    FID_1: number;
    PH_masterl: string;
    edad: number;
    kasarian: string;
    nationalit: string;
    residence: string;
    travel_hx: string;
    symptoms: string;
    confirmed: string;
    facility: string;
    latitude: number;
    longitude: number;
    status: string;
    epi_link: string;
    petsa: string;
}