import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { pangolin } from '../models/pangolin';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  pangolinId!: string;
  pangolin: pangolin = {
    token: '',
    _id: '',
    username: '',
    password: '',
    age: '',
    famille: '',
    race: '',
    nourriture: '',
    image: '',
    friends: [{}],
  };
  infos = {
    username: '',
    password: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.pangolinId = params.id;
      console.log('++++++++', this.pangolinId);
    });
    if (localStorage.getItem('pangolinId')) {
      this.router.navigate(['pangolin/', localStorage.getItem('pangolinId')]);
    }
  }
  signin() {
    this.AuthService.signin(this.infos).subscribe((data) => {
      console.log('pangolin', this.pangolin);
      console.log('data', data);
      this.signinSuccess(data), (error: any) => this.signinError(error);
    });
  }
  signinSuccess(data: pangolin) {
    window.alert('Success! Logged in!');
    console.log('logged in', data);
    console.log('dataId', data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('pangolin', JSON.stringify(data));
    this.router.navigate(['/']);
  }
  signinError(error: any) {
    window.alert('Error !Identifiants incorrects ');
    console.error('NOT logged in', error);
  }
}
