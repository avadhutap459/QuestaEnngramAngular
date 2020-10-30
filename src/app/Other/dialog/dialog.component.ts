import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private _router: Router,
                private _CookieSvc : CookieService) { }

  ngOnInit() {
    
  }
  Logout(){
    localStorage.removeItem('userToken');
    this._CookieSvc.delete('userTestIdCookie')
    this._CookieSvc.delete('userTokenCookie')
    //this._router.navigate(['/Register']);
    this._router.navigate(['/CandidateRegister', this.data.TestId]);
  }
}
