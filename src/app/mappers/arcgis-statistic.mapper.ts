import { ArcgisResponse, ValueResponse } from '../interfaces/arcgis';

export const getValueFromStatisticResponse = (arcgis: ArcgisResponse<ValueResponse<number>>) => 
    arcgis.features[0] && arcgis.features[0].attributes.value;


