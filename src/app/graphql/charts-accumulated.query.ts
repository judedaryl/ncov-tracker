import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';


export interface Accumulation {
    value: number;
    accumulator: Date
}

export interface ChartsQueryData {
    total: Accumulation[];
    died: Accumulation[];
    recovered: Accumulation[];
    admitted: Accumulation[];
}


@Injectable({
    providedIn: 'root',
})
export class ChartsAccumulatedQuery extends Query<ChartsQueryData> {
    document = gql`
        fragment chartAccumulateFragment on Accumulation {
            accumulator
            value
        }
        query ChartsAccumulate {
            total: accumulation(type: TOTAL) {
                ...chartAccumulateFragment
            }

            died: accumulation(type: DIED) {
                ...chartAccumulateFragment
            }

            recovered: accumulation(type: RECOVERED) {
                ...chartAccumulateFragment
            }

            admitted: accumulation(type: ADMITTED) {
                ...chartAccumulateFragment
            }
        }
    `;
}