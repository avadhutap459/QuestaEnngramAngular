import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../Model/user';
import { QuestionService } from './question.service';
import { AppConfig, APP_CONFIG } from '../app-config.module';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //public rooturl = 'http://questaenneagram-env.eba-72jbmwnf.ap-south-1.elasticbeanstalk.com';
  public rooturl = this.config.apiEndpoint;
  constructor(private _http: HttpClient,
    private _QueSvc: QuestionService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private _ErrorHandlerService: ErrorHandlerService) { }


  userAuthencation(username, password) {
    var data = "username=" + username + "&password=" + password + "&grant_type=password";
    var reqheader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' });
    return this._http.post(this.rooturl + '/token', data, { headers: reqheader });
  }

  SaveCandidateDetails(User: User): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      UserId: User.UserId,
      TestId : User.TestId,
      Title: User.Title,
      FirstName:User.FirstName,
      LastName:User.LastName,
      UserEmail: User.UserEmail,
      PhoneNumber:User.PhoneNumber,
      UserGender: User.UserGender,
      UserAge: User.UserAge,
      State: User.State,
      Country: User.Country,
      Qualification: User.Qualification,
      Professional: User.Professional,
      GenderTxt:User.GenderTxt,
      MaritalStatus:User.MaritalStatus,
      Industry:User.Industry,
      QualificationTxt:User.QualificationTxt,
      EmployeeStatus:User.EmployeeStatus
    }
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.rooturl + '/api/User/SaveCandidateDetails', body, options)
      .pipe(catchError(this._ErrorHandlerService.handleError))
  }


  getuserClaims(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('userToken')
      })
    };
    return this._http
      .get<any>(this.rooturl + "/api/User/GetUserClaim", httpOptions)
      .pipe(
        delay(200),
        catchError(this._ErrorHandlerService.handleError)
      );
  }

  IsUserExits(emailId, TestId): Observable<any> {
    /* let data = { emailId: emailId, TestId: TestId };
     return this._http.get<any>(this.rooturl + '/api/User/IsUserExits' ,{ params: data })
       .pipe(catchError(this._ErrorHandlerService.handleError));
       */
    return this._http.get<any>(this.rooturl + '/api/User/IsUserExits' + '/' + emailId + '/' + TestId)
      .pipe(catchError(this._ErrorHandlerService.handleError));
  }


  SaveInitialCandidateData(Title, FirstName, LastName, email, PhoneNumber): Observable<any> {
    return this._http.get<any>(this.rooturl + '/api/User/SaveInitialCandidateData' + '/' + Title + '/' + FirstName + '/' + LastName + '/' + email + '/' + PhoneNumber+'/'+1)
      .pipe(
        catchError(this._ErrorHandlerService.handleError)
      );
  }

  GetCandiateData(TestId): Observable<any> {
    return this._http.get<any>(this.rooturl + '/api/User/GetCandiateData'+'/'+TestId).pipe(
      catchError(this._ErrorHandlerService.handleError)
    );
  }

}
