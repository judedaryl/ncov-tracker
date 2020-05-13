import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
import gql from "graphql-tag";
import { DailyStatistic } from "../models/daily-statistic";

export interface ChartsDailyQueryData {
  total: DailyStatistic[];
  died: DailyStatistic[];
  recovered: DailyStatistic[];
  admitted: DailyStatistic[];
  active: DailyStatistic[];
}

@Injectable({
  providedIn: "root",
})
export class ChartsDailyQuery extends Query<ChartsDailyQueryData> {
  document = gql`
        fragment dailyFrag on DailyStatistic {
            value
            date
        }

        query dailyStats() {
            total: dailyStatistic(type: TOTAL) {
                ...dailyFrag
            }

            died: dailyStatistic(type: DIED) {
                ...dailyFrag
            }

            recovered: dailyStatistic(type: RECOVERED) {
                ...dailyFrag
            }

            admitted: dailyStatistic(type: ADMITTED) {
                ...dailyFrag
            }

            active: dailyStatistic(type: ACTIVE) {
                ...dailyFrag
            }
        }

    `;
}
