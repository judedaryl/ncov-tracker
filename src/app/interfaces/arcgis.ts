export interface ArcgisResponse<T> {
    features: FeatureResponse<T>[]
}

export interface FeatureResponse<T> {
    attributes: T
}

export interface ValueResponse<T> {
    value: T
}

export interface OverviewResponse {
    day: number;
    confirmed: number;
    PUIs: number;
    PUMs: number;
    recovered: number;
    deaths: number;
    tests: number;
}

export interface FacilityResponse {
    facility: string;
    edad: number;
    kasarian: string;
    nationalit: string;
    petsa: string;
    PH_masterl: string;
    FID: number;
}

export interface ResidenceResponse {
    value: number;
    residence: string;
}

export interface NationalityResponse {
    value: number;
    nationalit: string;
}

export interface ConfirmedResponse {
    date: number;
    admitted: number;
    recovered: number;
    deaths: number;
}

export type AgeGroup = '1 to 10' | '11 to 20' | '21 to 30' | '31 to 40' | '41 to 50' | '51 to 60' | '61 to 70' | '71 to 80' | '81 to 90' | '91 to 100'
export type GenderGroup = 'Male' | 'Female';

export interface AgeGroupResponse {
    value: number;
    age_categ: AgeGroup;
    sex: GenderGroup;
}

export interface InventoryResponse {
    region: string;
    n95: number;
    surgmask: number;
    osetamivir: number;
    ppe: number;
    sanitizer: number;
    gloves: number;
}

export interface PuiTracingResponse {
    region: string;
    hf: string;
    latitude: number;
    longtitude: number;
    PUIs: number;
}

export interface PuiRegionResponse {
    value: number;
    region: string;
}


export interface PuiHospitalFacilityResponse {
    value: number;
    hf: string;
}