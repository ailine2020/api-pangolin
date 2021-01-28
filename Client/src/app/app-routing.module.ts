import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPangolinComponent } from './all-pangolin/all-pangolin.component';

import { ErrorPageComponent } from './error-page/error-page.component';
import { OnePangolinComponent } from './one-pangolin/one-pangolin.component';
import { EditPangolinComponent } from './edit-pangolin/edit-pangolin.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'signin',component: SigninComponent},
  {path: 'signout',component: SigninComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'pangolin',component: AllPangolinComponent},
  {path: ':id',component: OnePangolinComponent},
  {path: 'pangolin/:id',component: OnePangolinComponent},
  {path: 'edit-pangolin/:id',component: EditPangolinComponent},
  {path: '**',component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
