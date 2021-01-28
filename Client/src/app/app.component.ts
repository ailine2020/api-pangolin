import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Client';
  constructor(private AuthService: AuthService, private router: Router) {}

  signout() {
    this.AuthService.signout().subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/signin']);
      },
      (err: any) => console.error(err)
    );
  }
}
