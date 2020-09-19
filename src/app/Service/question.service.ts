import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClsQuestionModel } from '../Model/question';
import { catchError } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from '../app-config.module';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  //public rooturl = 'http://questaenneagram-env.eba-72jbmwnf.ap-south-1.elasticbeanstalk.com';
  public rooturl = this.config.apiEndpoint;
  constructor(private _http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private _ErrorHandlerService: ErrorHandlerService) { }

  LoadQuestionModel(TestId, SetId): Observable<any> {
    /*let data = { TestId: TestId, SetId: SetId };
    return this._http.get<any>(this.rooturl + '/api/Question/LoadInitialQuestionModel',{ params: data })
      .pipe(catchError(this._ErrorHandlerService.handleError));
      */
     return this._http.get<any>(this.rooturl + '/api/Question/LoadInitialQuestionModel'+'/'+TestId+'/'+SetId)
     .pipe(catchError(this._ErrorHandlerService.handleError));
  }

  GetExamStatusCode(TestId): Observable<any> {
  /*  let data = { TestId: TestId };
    return this._http.get<any>(this.rooturl + '/api/Question/GetQuestionSetStatusCode',{ params: data })
      .pipe(catchError(this._ErrorHandlerService.handleError));
      */
     return this._http.get<any>(this.rooturl + '/api/Question/GetQuestionSetStatusCode'+'/'+TestId)
     .pipe(catchError(this._ErrorHandlerService.handleError)); 
  }

  SaveLoadNextQuestionModel(QuestionData: ClsQuestionModel): Observable<any> {

    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = Object.assign({}, QuestionData)
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.rooturl + '/api/Question/SaveLoadNextQuestion', body, options)
      .pipe(catchError(this._ErrorHandlerService.handleError))
  }
  SubmitCurrentSetofQuestionModel(QuestionData: ClsQuestionModel): Observable<any> {

    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = Object.assign({}, QuestionData)
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.rooturl + '/api/Question/SubmitSetofQuestion', body, options)
      .pipe(catchError(this._ErrorHandlerService.handleError))
  }
  SaveLoadNextSubModule(QuestionData: ClsQuestionModel): Observable<any> {

    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = Object.assign({}, QuestionData)
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.rooturl + '/api/Question/SaveLoadNextSubModule', body, options)
      .pipe(catchError(this._ErrorHandlerService.handleError))
  }
  SaveAndNextSetOpen(UserId, SetId, TestId, TypeId): Observable<any> {

    let data = {
      "UserId": UserId,
      "setId": SetId,
      "TestId": TestId,
      "TypeId": TypeId
    };
    let body = JSON.stringify(data)
    const headers = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.rooturl + '/api/Question/SaveAndNextSetOpen', body, options)
      .pipe(catchError(this._ErrorHandlerService.handleError));
  }

  CompleteUserTest(UserId, TestId): Observable<any> {
   /* let data = { UserId: UserId, TestId: TestId };
    return this._http.get<any>(this.rooturl + '/api/Question/CompleteUserTest',{ params: data })
      .pipe(catchError(this._ErrorHandlerService.handleError));
      */
     return this._http.get<any>(this.rooturl + '/api/Question/CompleteUserTest'+'/'+TestId+'/'+UserId)
      .pipe(catchError(this._ErrorHandlerService.handleError)); 
  }




}
