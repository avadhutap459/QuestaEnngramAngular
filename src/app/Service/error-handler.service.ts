import { Injectable, Inject } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from '../app-config.module';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  public rooturl = this.config.apiEndpoint;
  constructor(private _http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

  handleError(error: HttpErrorResponse) {

    let errorMessage: string;

    (error.error instanceof ErrorEvent) ? errorMessage = error.error.message :
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    return throwError(error);
  }

  SaveErrorLog(ErrorMessage: HttpErrorResponse): Observable<any> {
    if (ErrorMessage !== undefined) {
      switch (ErrorMessage.status) {
        case 400:
          let data = {
            "Message": ErrorMessage.message,
            "ErrorMsg": ErrorMessage.statusText,
            "RequestMethod": '',
            "RequestUri": ErrorMessage.url,
            "TimeUtc": null
          };
          let body = JSON.stringify(data)
          const headers = new HttpHeaders().set('content-type', 'application/json');
          let options = {
            headers: headers
          }
          return this._http.post<any>(this.rooturl + '/api/Errorhandler/SaveErrorLog', body, options);
          break;
      }
    }
  }



  SaveErrorForChartLog(ErrorMessage: HttpErrorResponse,TestId): Observable<any> {
    let data = {
      "Message": ErrorMessage.message,
      "ErrorMsg": ErrorMessage.statusText,
      "RequestMethod": 'GET',
      "RequestUri": 'ScoreCard/'+TestId,
      "TimeUtc": null
    };
    let body = JSON.stringify(data)
    const headers = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.rooturl + '/api/Errorhandler/SaveErrorLog', body, options);
   }

}
