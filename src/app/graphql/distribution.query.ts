import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';


export interface AgeGroupDistribution {
    ageGroup: string;
    sex: string;
    value: number;
}

export interface DistributionQueryData {
    total: AgeGroupDistribution[];
    died: AgeGroupDistribution[];
    recovered: AgeGroupDistribution[];
    admitted: AgeGroupDistribution[];
}


@Injectable({
    providedIn: 'root',
})
export class DistributionQuery extends Query<DistributionQueryData> {
    document = gql`        
        fragment ageGenderFragment on AgeGenderDistribution {
            ageGroup
            sex
            value
        }
        query AgeGenderDistribution {
            total: ageGenderDistribution(type: TOTAL) {
                ...ageGenderFragment
            }
            died: ageGenderDistribution(type: DIED) {
                ...ageGenderFragment
            }
            admitted: ageGenderDistribution(type: ADMITTED) {
                ...ageGenderFragment
            }
            recovered: ageGenderDistribution(type: RECOVERED) {
                ...ageGenderFragment
            }
        }
    `;
}