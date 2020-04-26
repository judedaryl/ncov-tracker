import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';


export interface CovidStatistics {
    total: number
    new: number
    admitted: number
    recovered: number
    died: number
}

export interface StatisticsQueryData {
    statistics: CovidStatistics;
}


@Injectable({
    providedIn: 'root',
})
export class StatisticsQuery extends Query<StatisticsQueryData> {
    document = gql`
    query Statistics {
        statistics {
            total,
            new,
            admitted,
            recovered,
            died:dead
        }
    }
    `;
}