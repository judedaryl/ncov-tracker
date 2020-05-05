import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { DailyStatistic } from 'src/app/models/daily-statistic';
import { CaseStatistics } from 'src/app/models/case-statistics';

export interface DashboardQueryData {
    total: DailyStatistic[];
    died: DailyStatistic[];
    recovered: DailyStatistic[];
    admitted: DailyStatistic[];
    active: DailyStatistic[];
    statistics: CaseStatistics
}


@Injectable({
    providedIn: 'root',
})
export class DashboardQuery extends Query<DashboardQueryData> {
    document = gql`
        fragment dailyFrag on DailyStatistic {
            value
            date
        }

        query stats($region: String, $province: String, $city: String) {
            total: dailyStatistic(type: TOTAL, region: $region, province: $province, city: $city) {
                ...dailyFrag
            }

            died: dailyStatistic(type: DIED, region: $region, province: $province, city: $city) {
                ...dailyFrag
            }

            recovered: dailyStatistic(type: RECOVERED, region: $region, province: $province, city: $city) {
                ...dailyFrag
            }

            admitted: dailyStatistic(type: ADMITTED, region: $region, province: $province, city: $city) {
                ...dailyFrag
            }

            active: dailyStatistic(type: ACTIVE, region: $region, province: $province, city: $city) {
                ...dailyFrag
            }
            statistics(region: $region, province: $province, city: $city) {
                total,
                new,
                admitted,
                admittedNew,
                recovered,
                recoveredNew,
                died:dead,
                diedNew: deadNew,
                active,
                activeNew
            }
        }

    `;
}