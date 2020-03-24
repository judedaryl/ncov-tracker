import { Feature } from './feature';

export interface ArcgisResponse<T> {
    features: Feature<T>[]
}