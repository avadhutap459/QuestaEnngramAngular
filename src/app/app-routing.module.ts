import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFormComponent } from './user-layout/register-form/register-form.component';
import { UserLayoutComponent  } from './user-layout/user-layout.component';
import { ListResolverService } from './Service/list.resolver.service';
import { PageNotFoundComponent } from './Other/page-not-found/page-not-found.component';
import { AuthGuard } from './Service/Guard/auth.guard';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';
import { QuestionWizardComponent } from './layout-dashboard/question-wizard/question-wizard.component';
import { ErrorPageComponent } from './ErrorHandler/error-page/error-page.component';
import { CandidateRegFormComponent } from './user-layout/candidate-reg-form/candidate-reg-form.component';

const routes: Routes = [

  { path: '', redirectTo: '/CandidateRegister/:Testid', pathMatch: 'full' },
 /* {
    path: 'Register',
    component: UserLayoutComponent,
    children: [
      { path: '', component: CandidateRegFormComponent }
    ]
  },*/
  {
    path: 'CandidateRegister/:Testid',
    component: UserLayoutComponent,
    children: [
      { path: '', component: RegisterFormComponent }
    ]
  },
  {
    path: 'QuestionDashboard', 
    component: LayoutDashboardComponent,
    resolve : {list : ListResolverService},
    runGuardsAndResolvers : 'always',
    canActivate :[AuthGuard]
  },
  {
    path: 'QuestionSeries/:Testid',
    component: LayoutDashboardComponent,
    children: [
      { path: '', component: QuestionWizardComponent}
    ],
    resolve : {list : ListResolverService},
    canActivate :[AuthGuard]
  },
  {
    path: 'ErrorPage/:Testid',
    component: LayoutDashboardComponent,
    children: [
      { path: '', component: ErrorPageComponent}
    ],
    resolve : {list : ListResolverService},
    canActivate :[AuthGuard]
  },
  {
    path: 'PageNotFound',
    component: UserLayoutComponent,
    children: [
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
  UserLayoutComponent,
  RegisterFormComponent,
  CandidateRegFormComponent,
  LayoutDashboardComponent,
  QuestionWizardComponent,
  ErrorPageComponent
]