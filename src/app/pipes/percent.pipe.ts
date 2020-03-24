import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentCustom'
})
export class PercentPipe implements PipeTransform {

  transform(value: string | number, decimals: number): any {
    let num: number;
    if (typeof value === 'string') {
      num = parseFloat(value);
    }
    else if (typeof value === 'number') {
      num = value;
    }
    else {
      throw TypeError("Percent pipe only handles string or number types");
    }

    const exp = Math.pow(10, -1 * decimals);
    const percent = num * 100;
    const dec = percent % exp;
    const percentValue = (percent - dec).toString();
    return `${this.padding(percentValue, decimals || 0)}%`;
  }

  private padding(value: string, decimals: number) {
    let splitPortion = value.split('.')[1];
    let currentDecimals = splitPortion && splitPortion.length || 0;
    let missingDecimals = decimals - currentDecimals;
    let zeroPaddings = Array(missingDecimals).fill("0").reduce((cur: string, val: string) => cur.concat(val), "");
    return value.concat(zeroPaddings);

  }

}
