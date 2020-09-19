import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private _router: Router,
                private _CookieSvc : CookieService,
                private dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

  ngOnInit() {
    
  }
  KeepLogin() {
    this.dialogRef.close({ data: '1' }) // send data to parent component
  }

  Logout(){
    localStorage.removeItem('userToken');
    this._CookieSvc.delete('userTestIdCookie')
    this._CookieSvc.delete('userTokenCookie')
    this._router.navigate(['/Register']);
  }
}
