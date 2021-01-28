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
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.pangolinId = params.pangolinId;
    });
  }
  signin() {
    console.log('pangolin', this.pangolin);
    this.AuthService.signin(this.pangolin).subscribe((data) => {
      // localStorage.setItem('currentUser', );
      // localStorage.getItem('currentUser');
      // localStorage.removeItem('currentUser');
      this.signinSuccess(data), (error: any) => this.signinError(error);
    });
  }
  signinSuccess(data: pangolin) {
    console.log('logged in', data);
    // this.router.navigate(['/pangolin', this.pangolinId]);
  }
  signinError(error: any) {
    console.error('NOT logged in', error);
  }
}
