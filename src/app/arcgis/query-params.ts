import { BaseObject } from "./base";


export type StatisticType =
    'sum' |
    'count' |
    'average' |
    'maximum' |
    'minimum' |
    'variance' |
    'standarddeviation'

export class QueryParams {
    f: string = 'json';
    where: string = '1=1';
    returnGeometry: string = 'false';
    /**
     * Pager field
     * 
     * similar to startAt
     */
    resultOffset: string = '';

    /**
     * Pager records per query
     */
    resultRecordCount: string = '';
    cacheHint: string = 'true';
    outFields: string = '*';
    spatialRel: string = 'esriSpatialRelIntersects';
    /**
      * Space field and order
      * 
      * e.g. value desc */
    orderByFields: string = '';
    /**
     * Space separated field names: 
     * 
     * e.g. age,gender */
    groupByFieldsForStatistics: string = '';
    /**
     * Stringified json array object with a single property
     * 
     * statisticType: StatisticType
     * 
     * onStatisticField: string ( field to analyze )
     * 
     * outStatisticFieldName: string ( set name for statistic field)
     * 
     * e.g.: [{"statisticType":"sum","onStatisticField":"PUIs","outStatisticFieldName":"value"}]
    */
    outStatistics: string = ''
}

export class QueryBuilder<T extends BaseObject> {
    private _queryParams: QueryParams;

    constructor() {
        this._queryParams = new QueryParams;
    }
    setPaging(startAt: number, limit: number): QueryBuilder<T> {
        this._queryParams.resultOffset = startAt && startAt.toString() || '';
        this._queryParams.resultRecordCount = limit && limit.toString() || '';
        return this;
    }

    setOrder(prop: keyof T | 'value', order: 'asc' | 'desc' = 'desc'): QueryBuilder<T> {
        this._queryParams.orderByFields = `${prop} ${order}`;
        return this;
    }

    setGrouping(...fields: (keyof T)[]) {
        this._queryParams.groupByFieldsForStatistics = fields.join(',');
        return this;
    }

    setStatistic(type: StatisticType, onfield: keyof T) {
        this._queryParams.outStatistics = `[{"statisticType":"${type}","onStatisticField": "${onfield}","outStatisticFieldName":"value"}]`;
        return this;
    }

    setQuery(query: string) {
        this._queryParams.where = query;
        return this;
    }

    build(): QueryParams {
        return this._queryParams;
    }
}