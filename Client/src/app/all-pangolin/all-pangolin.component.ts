import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { pangolin } from '../models/pangolin';
import { PangolinService } from '../pangolin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-all-pangolin',
  templateUrl: './all-pangolin.component.html',
  styleUrls: ['./all-pangolin.component.css'],
})
export class AllPangolinComponent implements OnInit {
  allPangolin$: Observable<pangolin[]> | undefined;

  constructor(
    private pangolinService: PangolinService,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.AuthService.isAuthenticated) {
      this.router.navigate(['/signin']);
    }
    this.allPangolin$ = this.pangolinService.getPangolin();
  }
}