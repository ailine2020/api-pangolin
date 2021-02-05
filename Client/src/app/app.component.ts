import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Client';
  constructor(private AuthService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  signout() {
    this.AuthService.signout().subscribe(
      (data: any) => {
        console.log(data);
        localStorage.removeItem('token');
        this.router.navigate(['/signin']);
      },
      (err: any) => console.error(err)
    );
  }
}
