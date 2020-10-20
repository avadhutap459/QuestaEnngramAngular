import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/Model/user';
import { UserService } from 'src/app/Service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-candidate-reg-form',
  templateUrl: './candidate-reg-form.component.html',
  styleUrls: ['./candidate-reg-form.component.css']
})
export class CandidateRegFormComponent implements OnInit {

  loading = false;
  registerForm: FormGroup;
  submitted = false;
  Title: any[] = [
    {id: 1, Value: 'Mr'},
    {id: 2, Value: 'Mrs'},
  ];

  UserModel: User = {
    UserId: null,
    TestId: null,
    Title:'',
    FirstName:'',
    LastName:'',
    UserEmail: '',
    PhoneNumber:null,
    UserGender: null,
    UserAge: null,
    State: null,
    Country: null,
    Qualification: null,
    Professional: null,
    GenderTxt: '',
    MaritalStatus:null,
    Industry : [],
    QualificationTxt:'',
    EmployeeStatus:null,
    ProfileId:null,
    IsOTPRequire:null
  };

  constructor(private formBuilder: FormBuilder
              , private _userSvc: UserService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        Title: ["", [Validators.required]],
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        PhoneNumber: ["", [Validators.required, Validators.minLength(0),Validators.maxLength(10)]]
      }
    );
  }

  // Getter function in order to get form controls value
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // Returns false if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this._userSvc.SaveInitialCandidateData(this.UserModel.Title, 
                                          this.UserModel.FirstName,
                                          this.UserModel.LastName,
                                          this.UserModel.UserEmail,
                                          this.UserModel.PhoneNumber)
      .subscribe((data: any) => {
        let IsSuccess = data.isSuccess;
        if(IsSuccess){
          confirm("Assessement url send to your registration email id "+ this.UserModel.UserEmail);
         // this.loading = fa;
        }
      }, (err: HttpErrorResponse) => {
        console.log(err)
      });
  }

}
