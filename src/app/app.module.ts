import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DialogComponent } from './Other/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuard } from './Service/Guard/auth.guard';
import { CountUpModule } from 'ngx-countup';
import { QuestionService } from './Service/question.service';
import { CountryService } from './Service/country.service';
import { ListResolverService } from './Service/list.resolver.service';
import { UserService } from './Service/user.service';
import { QuestionSetComponent } from './layout-dashboard/question-set/question-set.component';
import { QuestionTemplateComponent } from './layout-dashboard/question-template/question-template.component';
import { ScoreTemplateComponent } from './layout-dashboard/score-template/score-template.component';
import { QuestionTableTemplateComponent } from './layout-dashboard/question-table-template/question-table-template.component';
import { GooleChart2Service } from './layout-dashboard/score-template/Service/goole-chart.service';
import { CompleteTestComponent } from './layout-dashboard/complete-test/complete-test.component';
import { QuestionDragAndDropTemplateComponent } from './layout-dashboard/question-drag-and-drop-template/question-drag-and-drop-template.component';
import { AppConfigModule } from './app-config.module';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { QuestionSet6TemplateComponent } from './layout-dashboard/question-set6-template/question-set6-template.component';
import { BlindspotTemplateComponent } from './layout-dashboard/question-set6-template/blindspot-template/blindspot-template.component';
import { FixationsTemplateComponent } from './layout-dashboard/question-set6-template/fixations-template/fixations-template.component';
import { LinesTemplateComponent } from './layout-dashboard/question-set6-template/lines-template/lines-template.component';
import { ErrorPageComponent } from './ErrorHandler/error-page/error-page.component';
import { ConfirmationDialogComponent } from './Other/confirmation-dialog/confirmation-dialog.component';
import { InstructionDialoComponent } from './Other/instruction-dialo/instruction-dialo.component';
import { ModuleDialogComponent } from './Other/module-dialog/module-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    DialogComponent,
    ConfirmationDialogComponent,
    InstructionDialoComponent,
    QuestionSetComponent,
    QuestionTemplateComponent,
    ScoreTemplateComponent,
    QuestionTableTemplateComponent,
    CompleteTestComponent,
    QuestionDragAndDropTemplateComponent,
    QuestionSet6TemplateComponent,
    BlindspotTemplateComponent,
    FixationsTemplateComponent,
    LinesTemplateComponent,
    ErrorPageComponent,
    ModuleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    CountUpModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
    AppConfigModule,
    NgxSliderModule
  ],
  providers: [QuestionService,
              CountryService,
              ListResolverService,
              UserService,
              AuthGuard,
              GooleChart2Service,
              CookieService],
  bootstrap: [AppComponent],
  entryComponents:[DialogComponent,ConfirmationDialogComponent,InstructionDialoComponent,ModuleDialogComponent]
})
export class AppModule { }
