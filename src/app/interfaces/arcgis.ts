export interface ArcgisResponse<T> {
    features: FeatureResponse<T>[]
}

export interface FeatureResponse<T> {
    attributes: T
}

export interface ValueResponse<T> {
    value: T
}