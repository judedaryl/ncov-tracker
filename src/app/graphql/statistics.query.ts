import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { CaseStatistics } from '../models/case-statistics';



export interface StatisticsQueryData {
    statistics: CaseStatistics;
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