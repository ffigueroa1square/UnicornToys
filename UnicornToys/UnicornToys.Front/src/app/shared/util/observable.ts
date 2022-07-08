
import { connectable, ConnectableObservable, forkJoin, Observable, publish, share, Subject } from 'rxjs';

/** Turns a cold observable into a hot one,
 * that is, subscribes immediately to the source observable
 * and starts emitting values
 */
export function makeHot<T>(observable: Observable<T>): Observable<T> {
  const obs = connectable(observable, {
    connector: () => new Subject<T>(),
    resetOnDisconnect: false
  });
  obs.connect();
  return obs;
}