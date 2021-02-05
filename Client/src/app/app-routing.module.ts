import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPangolinComponent } from './all-pangolin/all-pangolin.component';

import { ErrorPageComponent } from './error-page/error-page.component';
import { OnePangolinComponent } from './one-pangolin/one-pangolin.component';
import { EditPangolinComponent } from './edit-pangolin/edit-pangolin.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signout', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'pangolin', component: AllPangolinComponent },
  { path: 'pangolin/:id/my-friends', component: MyFriendsComponent },
  { path: 'pangolin/:id', component: OnePangolinComponent },
  { path: 'edit-pangolin/:id', component: EditPangolinComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
