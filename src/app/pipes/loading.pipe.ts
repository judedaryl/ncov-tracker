import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { startWith, catchError, map } from 'rxjs/operators';

@Pipe({
  name: 'loading'
})
export class LoadingPipe implements PipeTransform {
  transform(val) {
    return isObservable(val)
      ? val.pipe(
        map((value: any) => ({ loading: false, value })),
        startWith({ loading: true }),
        catchError(error => of({ loading: false, error }))
      )
      : val;
  }
}
