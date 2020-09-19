import { Component, OnInit } from '@angular/core';
import { Event,Router, NavigationStart, NavigationEnd } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "logoicon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/signature-revised-1.svg")
      );
   }

  ngOnInit(): void {
  }

}
