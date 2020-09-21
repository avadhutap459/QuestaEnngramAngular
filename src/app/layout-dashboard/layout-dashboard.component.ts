import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DialogComponent } from '../Other/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../Other/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrls: ['./layout-dashboard.component.css']
})
export class LayoutDashboardComponent implements OnInit {

  userClaim: any;
  UserName: string;
  TestId: number;
  Name: string;
  IsSubmenuOpen: boolean;
  @ViewChild('mySubMenu') mySubMenu: ElementRef;
  destroy = new Subject();
  timeLeft : number = 300;
  interval ;
  modelId : number = 0;
  //timer: number;
  //rxjsTimer = timer(1000, 1000);
  IsLooseFocus: boolean;
  dialogRef : any;
  constructor(private _route: ActivatedRoute,
    public matDialog: MatDialog) { }

  ngOnInit() {

    this.userClaim = Object.assign({}, this._route.snapshot.data['list']);
    this.UserName = this.userClaim.userAuth.Username;
    this.TestId = this.userClaim.userAuth.TestId;
    this.Name = this.userClaim.userAuth.Name;
    this.IsSubmenuOpen = false;
    this.IsLooseFocus = false;

  }

  OpenSubmenu() {
    if (this.mySubMenu.nativeElement.classList.value === 'dropdown-menu dropdown-user animated fadeIn') {
      this.IsSubmenuOpen = true;
    } else {
      this.IsSubmenuOpen = false;
    }
  }
  openDialog() {
    this.IsSubmenuOpen = false;
    var _username = this.Name;
    this.matDialog.open(DialogComponent, {
      disableClose: true,
      id: "modal-component",
      data: { name: _username },
    })


  }

  @HostListener('window:focus', ['$event'])
  onFocus(event) {

    this.pauseTimer();
    this.timeLeft = 300;
    if (this.IsLooseFocus) {
      ///this.openDialog()
      var _username = this.Name;
      this.modelId = this.modelId + 1;

      if(this.dialogRef !== undefined){
        if (!this.dialogRef.openDialogs || !this.dialogRef.openDialogs.length) return;
      }
      

      this.dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
        disableClose: true,
        id: "modal-component" + this.modelId,
        data: { name: _username },
      })
      this.dialogRef.afterClosed().subscribe(res => {
        if (res.data === "1") {
          this.IsLooseFocus = false;
        }
      })
    }
    // console.log("****user attempted leaving but changed its mind, do actions here");
  }
  @HostListener('window:blur', ['$event'])
  onBlur(event) {
    if (this.IsLooseFocus === false) {
      this.startTimer();
    } else {
      this.IsLooseFocus = true;
    }
  }

  

  startTimer(){
    this.interval = setInterval(() => {
      if(this.timeLeft > 0){
        this.timeLeft--;
      } else {
        this.IsLooseFocus = true;
      }
    },1000)
  }

  pauseTimer(){
    clearInterval(this.interval);
  }


}
