import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-module-dialog',
  templateUrl: './module-dialog.component.html',
  styleUrls: ['./module-dialog.component.css']
})
export class ModuleDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private _router: Router,
  private _CookieSvc : CookieService) { }

ngOnInit() {

}
  
}
