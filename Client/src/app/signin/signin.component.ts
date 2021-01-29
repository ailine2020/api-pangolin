import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { pangolin } from '../models/pangolin';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  pangolinId!: string;
  pangolin: pangolin = {
    _id: '',
    username: '',
    password: '',
    age: '',
    famille: '',
    race: '',
    nourriture: '',
    image:''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // if (localStorage.getItem('pangolinId')) {
    //   this.router.navigate(['pangolin/', localStorage.getItem('pangolinId')]);
    // }
    this.activatedRoute.params.subscribe((params) => {
      this.pangolinId = params.id;
    });
  }
  signin() {
    console.log('pangolin', this.pangolin);
    this.AuthService.signin(this.pangolin).subscribe((data: pangolin) => {
      this.signinSuccess(data), (error: any) => this.signinError(error);
    });
  }
  signinSuccess(data: pangolin) {
    window.alert('Success! Logged in!');
    console.log('logged in', data);
    // localStorage.getItem(data._id);
    this.router.navigate(['/']);
  }
  signinError(error: any) {    
    window.alert('Error !Identifiants incorrects ');
    console.error('NOT logged in', error);
  }
}
