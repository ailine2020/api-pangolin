import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { pangolin } from '../models/pangolin';
import { PangolinService } from '../services/pangolin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-all-pangolin',
  templateUrl: './all-pangolin.component.html',
  styleUrls: ['./all-pangolin.component.css'],
})
export class AllPangolinComponent implements OnInit {
  allPangolin$!: Observable<pangolin[]>;
  pangolinId!: string;
  currentId!: any;

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
    this.currentId = localStorage.getItem('pangolin');
    this.currentId = JSON.parse(this.currentId).pangolin._id;
    console.log('current ID ====>', this.currentId);
  }
}
