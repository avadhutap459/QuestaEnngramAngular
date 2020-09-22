import { Component, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-otpdialog',
  templateUrl: './otpdialog.component.html',
  styleUrls: ['./otpdialog.component.css']
})
export class OTPDialogComponent implements OnInit {
  
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  
  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  countDown;
  count;
  
  constructor() { }
  

  ngOnInit(): void {
  }
  
  onOtpChange(otp) {
    alert(otp)
  }
  
  startTimer(){
    this.countDown = setInterval(() => {
      if(this.count > 0){
        this.count--;
      } else if(this.count == 0){
        this.count = 10;
      }
    },1000)
  }
}
