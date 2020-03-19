export interface FacilityStatistics {
    facility: string;
    cases: FacilityCase[];
}

export interface FacilityCase {
    identifier: string;
    age: number;
    date: Date;    
}