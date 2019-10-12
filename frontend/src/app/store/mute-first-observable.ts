import { Observable, combineLatest  } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export const muteFirst = <T, R>(first$: Observable<T>, second$: Observable<R>): Observable<R> => {
  return combineLatest(first$, second$).pipe(
    map(([a, b]: [T, R]): R => b),
    distinctUntilChanged(),
  );
};
