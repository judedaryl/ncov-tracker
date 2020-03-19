export interface ArcgisResponse<T> {
    features: FeatureResponse<T>[]
}

export interface FeatureResponse<T> {
    attributes: T
}

export interface ValueResponse<T> {
    value: T
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