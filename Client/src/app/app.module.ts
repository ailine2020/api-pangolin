import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllPangolinComponent } from './all-pangolin/all-pangolin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OnePangolinComponent } from './one-pangolin/one-pangolin.component';
import { EditPangolinComponent } from './edit-pangolin/edit-pangolin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddCookieInterceptor } from './services/http-iinterceptor.service';
import { MyFriendsComponent } from './my-friends/my-friends.component';

@NgModule({
  declarations: [
    AppComponent,
    AllPangolinComponent,
    ErrorPageComponent,
    OnePangolinComponent,
    EditPangolinComponent,
    SigninComponent,
    SignupComponent,
    HomePageComponent,
    MyFriendsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddCookieInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
