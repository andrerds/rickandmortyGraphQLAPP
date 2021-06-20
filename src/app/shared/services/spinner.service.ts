import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  isLoading$ = new Subject<boolean>();
  constructor() {}

  showSpinner() {
    this.isLoading$.next(true);
  }
  hideSpinner() {
    this.isLoading$.next(false);
  }
}
