import { ArcgisResponse, ValueResponse, FacilityResponse, ResidenceResponse } from '../interfaces/arcgis';
import { FacilityStatistics } from '../interfaces/facility-statistics';
import { ResidenceStatistics } from '../interfaces/residence-statistics';

export const getValueFromStatisticResponse = (arcgis: ArcgisResponse<ValueResponse<number>>) =>
    arcgis.features[0] && arcgis.features[0].attributes.value;


export function getFacilityStatistic(arcgis: ArcgisResponse<FacilityResponse>): FacilityStatistics[] {
    const attributes = arcgis.features.map(q => q.attributes);
    let facilityDictionary: { [id: string]: FacilityResponse[] } = attributes.reduce((obj, val) => {
        (obj[val.facility] = obj[val.facility] || []).push(val)
        return obj;
    }, {})
    return Object.keys(facilityDictionary).map(key => ({
        facility: getFacilityName(facilityDictionary[key]),
        cases: facilityDictionary[key].map(({ petsa, edad, PH_masterl }) => ({
            identifier: PH_masterl,
            date: breakSlashDate(petsa),
            age: edad
        }))
    }))
    .sort((b,a) => a.cases.length - b.cases.length);
}

function breakSlashDate(date: string): Date {
    if(date == null) return null;
    var props = date.split('/').map(q => parseInt(q));
    return new Date(props[2], props[0] - 1, props[1]);
}

function getFacilityName(facilityResponse: FacilityResponse[]) {
    let name = facilityResponse[0] && facilityResponse[0].facility || "";
   return name.trim() === "" ? 'Unknown facility' : name.trim();
}

export const getResidenceStatistic = (arcgis: ArcgisResponse<ResidenceResponse>): ResidenceStatistics[] =>
    arcgis.features.map(q => q.attributes);