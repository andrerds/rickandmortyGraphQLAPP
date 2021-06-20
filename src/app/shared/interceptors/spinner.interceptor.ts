import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.showSpinner();
    return next.handle(req).pipe(
      finalize(() => {
        this.spinnerService.hideSpinner();
      })
    );
    // const headers = req.headers.set('Content-Type', 'application/json');
    // const authReq = req.clone({ headers });
    // return next.handle(authReq);
  }
}
