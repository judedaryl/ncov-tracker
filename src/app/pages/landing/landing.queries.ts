import gql from 'graphql-tag'
import { SelectItem } from 'src/app/models/select-item'


export interface RegionQuery {
    region: SelectItem[]
}

export const regionQuery = gql`
{
  region {
    value
    display
  }
}
`

export interface ProvinceQuery {
    province: SelectItem[]
}

export const provinceQuery = gql`
    query provinceQuery($region: String) {
        province(region: $region) {
            value
            display
        }
    }
`

export interface ProvinceQueryVariables {
    region: string
}


export interface CityQuery {
    city: SelectItem[]
}

export const cityQuery = gql`
    query cityQuery($region: String, $province: String) {
        city(region: $region, province: $province) {
            value
            display
        }
    }
`
export interface CityQueryVariables {
    region: string;
    province: string;
}