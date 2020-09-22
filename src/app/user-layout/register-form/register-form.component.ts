import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { QualificationModel, CountryModel, StateModel, ProfessionModel, GenderModel, MaritalStatusModel, EmployeeStatusModel, IndustryModel, AgeModel } from 'src/app/Model/country';
import { User } from 'src/app/Model/user';
import { CountryService } from 'src/app/Service/country.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { InstructionDialoComponent } from 'src/app/Other/instruction-dialo/instruction-dialo.component';
import { RequirevalidatorGender, RequirevalidatorQualification, RequirevalidatorForState } from 'src/app/Custom Validator/Require-Validator.directive';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { OTPDialogComponent } from 'src/app/Other/otpdialog/otpdialog.component';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  error: string;
  TestId: Number;
  loading = false;
  showMsg: boolean = false;
  UserModel: User = {
    UserId: null,
    TestId: null,
    Title: '',
    FirstName: '',
    LastName: '',
    UserEmail: '',
    PhoneNumber: null,
    UserGender: null,
    UserAge: null,
    State: null,
    Country: null,
    Qualification: null,
    Professional: null,
    GenderTxt: '',
    MaritalStatus: null,
    Industry: [],
    QualificationTxt: '',
    EmployeeStatus: null
  };
  countries: CountryModel[];
  states: StateModel[];
  Qualification: QualificationModel[];
  Profession: ProfessionModel[];
  Gender: GenderModel[];
  MaritalStatus: MaritalStatusModel[];
  EmployeeStatus: EmployeeStatusModel[];
  Industry: string[];
  Age: AgeModel[];
  candidateregisterForm: FormGroup;
  submitted = false;
  IsDisableAllControl: boolean;
  ErrorLog: HttpErrorResponse;
  @ViewChild('search') searchTextBox: ElementRef;
  searchTextboxControl = new FormControl();
  selectedValues = [];
  filteredOptions: Observable<any[]>;

  constructor(private _countrySVC: CountryService,
    private _userSvc: UserService,
    private _router: Router,
    private _CookieSvc: CookieService,
    public matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _ErrorHandlerService: ErrorHandlerService) { }

  ngOnInit() {


    this._route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('Testid'));
      this.TestId = id;
    });
    this.candidateregisterForm = this.formBuilder.group(
      {
        Gender: ["", [Validators.required]],
        GenderTxt: [""],
        Age: ["", [Validators.required]],
        MaritalStatus: ["", [Validators.required]],
        Qualification: ["", [Validators.required]],
        QualificationTxt: [""],
        EmployeeStatus: ["", [Validators.required]],
        Industry: ["", [Validators.required]],
        Country: ["", [Validators.required]],
        State: [""]
      },
      {
        // Used custom form validator name
        validator: [RequirevalidatorGender("Gender", "GenderTxt"),
        RequirevalidatorQualification("Qualification", "QualificationTxt"),
        RequirevalidatorForState("Country", "State")]
      }
    );
  //  this.StoreCookie();

    this.GetAllMasterFieldData();

    this.GetCandidateData();
  }

  StoreCookie() {
    
    if (this._CookieSvc.get("userTokenCookie") === null ||
      this._CookieSvc.get("userTokenCookie") === '' ||
      this._CookieSvc.get("userTokenCookie") === undefined) {

      localStorage.removeItem('userToken');
      this._CookieSvc.deleteAll();
      this._CookieSvc.delete('userTestIdCookie')
      this._CookieSvc.delete('userTokenCookie')
    } else {
      let TestId = this._CookieSvc.get('userTestIdCookie');
      this._router.navigate(['/QuestionSeries', TestId]);
    }
  }

  GetAllMasterFieldData() {
    this._countrySVC.GetMaster().subscribe(
      data => {
        this.countries = data.Countries;
        this.Qualification = data.Qualification;

        this.Profession = data.Profession;
        this.Age = data.Age;
        this.Gender = data.Gender;
        this.MaritalStatus = data.MaritalStatus;
        this.EmployeeStatus = data.EmployeeStatus;
        this.Industry = data.Industry;

        this.filteredOptions = this.searchTextboxControl.valueChanges
          .pipe(
            startWith<string>(''),
            map(name => this._filter(name))
          );
      },
      error => {
        if (error.status !== 500) {
          this.ErrorLog = error;
          this._ErrorHandlerService.SaveErrorLog(this.ErrorLog).subscribe(
            data => {
              this._router.navigate(['/ErrorPage', this.TestId]);
            },
            error => { }
          )
        } else {
          this._router.navigate(['/ErrorPage', this.TestId]);
        }
      }
    );

  }

  GetCandidateData() {
    this._userSvc.GetCandiateData(this.TestId).subscribe(data => {
      this.UserModel = data.CandidateData;
      if(this.UserModel.Country !== 0){
        this.onChangeCountry(this.UserModel.Country);
      }
      this.IsDisableAllControl = data.IsDisableAllControl;
      if(this.IsDisableAllControl){
        for(let i=0;i<=this.UserModel.Industry.length -1 ;i++){
          this.selectedValues.push(this.UserModel.Industry[i]);
        }
        
        this.candidateregisterForm.disable();
      }
      
    }, error => {
      if (error.status !== 500) {
        this.ErrorLog = error;
        this._ErrorHandlerService.SaveErrorLog(this.ErrorLog).subscribe(
          data => {
            this._router.navigate(['/ErrorPage', this.TestId]);
          },
          error => { }
        )
      } else {
        this._router.navigate(['/ErrorPage', this.TestId]);
      }
    })
  }


  onChangeCountry(countryId: number) {
    if (countryId) {
      this._countrySVC.GetState(countryId).subscribe(
        data => {
          this.states = data.State
        },
        error => {
          this.error = error;
        }
      );
    } else {
      this.states = null;
    }
  }


  OnSubmitDetails() {
    this.loading = true;
    this._userSvc.userAuthencation(this.UserModel.UserEmail, '')
      .subscribe((data: any) => {
        localStorage.setItem('userToken', data.access_token);
        var now = new Date();
        now.setTime(now.getTime() + 1 * 3600 * 3000);
        this._CookieSvc.set('userTokenCookie', data.access_token, now)
        this.SaveCandidateDetail(this.UserModel);
      }, (err: HttpErrorResponse) => {
        console.log(err)
      });
  }

  SaveCandidateDetail(UserM: User) {
    this._userSvc.SaveCandidateDetails(UserM).
      subscribe((res: any) => {
        var issucess = res.isSuccess;
        this.TestId = res.ExamId;
        if (issucess) {
          //this._router.navigate(['/Layout']);
          this._CookieSvc.set('userTestIdCookie', this.TestId.toString())
          let TestId = this.TestId;

          // this._router.navigate(['/QuestionSeries', TestId]);

          this.matDialog.open(InstructionDialoComponent, {
            disableClose: true,
            id: "modal-component",
            data: { TestId: TestId },
          })

        }
      }, (err: HttpErrorResponse) => {
        console.log(err)
      })
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // Returns false if form is invalid
    if (this.candidateregisterForm.invalid) {
      return;
    }
    if(this.selectedValues.length > 0){
      this.UserModel.Industry = [];
      for(let i=0;i<=this.selectedValues.length-1;i++){
        this.UserModel.Industry.push(this.selectedValues[i]);
      }
    }
    this._userSvc.userAuthencation(this.UserModel.UserEmail, '')
      .subscribe((data: any) => {
        localStorage.setItem('userToken', data.access_token);
      //  var now = new Date();
      //  now.setTime(now.getTime() + 1 * 3600 * 3000);
      //  this._CookieSvc.set('userTokenCookie', data.access_token, now)

     // this.matDialog.open(OTPDialogComponent, {
     //   disableClose: true,
     //   id: "OTP-component"
     // })


        this.SaveCandidateDetail(this.UserModel);
      }, (err: HttpErrorResponse) => {
        console.log(err)
      });
  }

  get f() {
    return this.candidateregisterForm.controls;
  }

  onChangeGender(GenderId: number) {
    if (GenderId !== 3) {
      this.candidateregisterForm.controls['GenderTxt'].reset();
    }
  }

  /** Start Multi select searchable dropdown */

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state 
    this.setSelectedValues();
    this.candidateregisterForm.controls["Industry"].patchValue(this.selectedValues);
    let filteredList = this.Industry.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }
  selectionChange(event) {
    if (event.isUserInput && event.source.selected == false) {
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1)
    }
  }
  openedChange(e) {
    // Set search textbox value as empty while opening selectbox 
    this.searchTextboxControl.patchValue('');
    // Focus to search textbox while clicking on selectbox
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }
  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }
  setSelectedValues() {
    // console.log('selectFormControl',  this.candidateregisterForm.controls["Qualification"].value);
    if (this.candidateregisterForm.controls["Industry"].value && this.candidateregisterForm.controls["Industry"].value.length > 0) {
      this.candidateregisterForm.controls["Industry"].value.forEach((e) => {
        let IndustryId = e;
        if (this.selectedValues.indexOf(IndustryId) == -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }
  GetFirstpostionValue(Data: string[]): string {
    if(Data !== null){
      var length = Data.length;
      if (length > 0) {
        let IndustryName = Data[0].toString();
        return IndustryName
      }
    }
    return '';
  }
  GetLengthIndustry(Data: string[]): boolean {
    if(Data !== null){
      var length = Data.length;
      if (length > 1) {
        return true
      }
    }
    
    return false
  }
  CountIndustryValue(Data: string[]): string {
    if(Data !== null){
      var length = Data.length;
      var IndustryDisplay;
      if (length > 1) {
        IndustryDisplay = length - 1
        IndustryDisplay = IndustryDisplay + (length === 2 ? 'other' : 'others');
        return IndustryDisplay
      }
    }
    
    return '';
  }
  FilterIndustryCount(FilterIndustryData: any) {
    if(FilterIndustryData !== null){
      var length = FilterIndustryData.length;
      if (length === 0) {
        return true
      }
    }
    
    return false
  }
  /**End */

}
