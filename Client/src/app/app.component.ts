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
  user: String | null = null;
  constructor(private AuthService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.user = localStorage.getItem('pangolinId');
  }

  signout() {
    this.AuthService.signout().subscribe(
      (data: any) => {
        console.log(data);
        localStorage.removeItem('pangolinId');
        this.router.navigate(['/signin']);
      },
      (err: any) => console.error(err)
    );
  }
}
