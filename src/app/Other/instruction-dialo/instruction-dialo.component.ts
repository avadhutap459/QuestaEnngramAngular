import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-instruction-dialo',
  templateUrl: './instruction-dialo.component.html',
  styleUrls: ['./instruction-dialo.component.css']
})
export class InstructionDialoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private _router: Router,
                private _CookieSvc : CookieService) { }

  ngOnInit() {
    
  }
  Navigate(){
    this._router.navigate(['/QuestionSeries', this.data.TestId]);
  }
}
