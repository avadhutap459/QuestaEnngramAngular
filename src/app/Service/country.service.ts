import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionService } from './question.service';
import { catchError } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from '../app-config.module';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // public rooturl = 'http://questaenneagram-env.eba-72jbmwnf.ap-south-1.elasticbeanstalk.com';
  // public rooturl = 'http://localhost:52595';
  public rooturl = this.config.apiEndpoint;
  constructor(private _http: HttpClient,
    private _QueSvc: QuestionService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private _ErrorHandlerService: ErrorHandlerService) { }




  GetAllCountry(): Observable<any> {
    return this._http.get<any>(this.rooturl + '/api/User/GetCountries').pipe(
      catchError(this._ErrorHandlerService.handleError)
    );
  }

  GetState(CountryId): Observable<any> {
   /* let data = { CountryId: CountryId };
    return this._http.get<any>(this.rooturl + '/api/User/GetState',{ params: data }).pipe(
      catchError(this._ErrorHandlerService.handleError)
    );*/
    return this._http.get<any>(this.rooturl + '/api/User/GetState'+'/'+CountryId).pipe(
      catchError(this._ErrorHandlerService.handleError)
    );
  }

  GetQualification(): Observable<any> {
    return this._http.get<any>(this.rooturl + '/api/User/GetQualification').pipe(
      catchError(this._ErrorHandlerService.handleError)
    );
  }

  GetProfession(): Observable<any> {
    return this._http.get<any>(this.rooturl + '/api/User/GetProfession').pipe(
      catchError(this._ErrorHandlerService.handleError)
    );
  }

  GetMaster(): Observable<any> {
    return this._http.get<any>(this.rooturl + '/api/User/GetMaster').pipe(
      catchError(this._ErrorHandlerService.handleError)
    );
  }


 


}
