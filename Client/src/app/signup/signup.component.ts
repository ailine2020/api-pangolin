import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  createForm = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm();
  }
  signupForm() {
    this.createForm = this.fb.group({
      username: '',
      password: '',
      age: '',
      famille: '',
      race: '',
      nourriture: '',
    });
  }
  createPangolin(formDirective: FormGroupDirective) {
    if (this.createForm.valid) {
      console.log(this.createForm);
      this.AuthService.signup(this.createForm.value).subscribe(
        (data: object) => this.signupSuccess(data, formDirective),
        (error: any) => this.signupError(error)
      );
    }
  }
  signupSuccess(data: object, formDirective: FormGroupDirective) {
    console.log('OK Success - Pangolin created', data);
    window.alert('Success!');
    this.router.navigate(['/pangolin']);
  }

  signupError(error: any) {
    console.error('KO Error - Pangolin NOT created', error);
    window.alert('Error')
  }
}
