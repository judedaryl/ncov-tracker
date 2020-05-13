import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { LocationStatistic } from 'src/app/models/location-statistic';

export interface LocationQueryData {
    region: LocationStatistic[],
    province: LocationStatistic[],
    cebu: LocationStatistic[],
    manila: LocationStatistic[],
    bohol: LocationStatistic[]
}


@Injectable({
    providedIn: 'root',
})
export class LocationQuery extends Query<LocationQueryData> {
    document = gql`
        fragment locationFragment on LocationStatistic {
            name
            total
            new
            admitted
            admittedNew
            recovered
            recoveredNew
            died: dead
            diedNew: deadNew
            active
            activeNew
            }
        query locationQuery {
            province: locationStatistic(type: PROVINCE) {
                ...locationFragment
            }
            region: locationStatistic(type: REGION) {
                ...locationFragment
            }
            cebu: locationStatistic(type: CITY, search: "CEBU PROVINCE", searchType: PROVINCE) {
                ...locationFragment
            }
            manila: locationStatistic(type: CITY, search: "METRO MANILA", searchType: PROVINCE) {
                ...locationFragment
            }
            bohol: locationStatistic(type: CITY, search: "BOHOL", searchType: PROVINCE) {
                ...locationFragment
            }
        }
    `;
}