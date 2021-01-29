import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pangolin } from '../models/pangolin';
import { PangolinService } from '../services/pangolin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-one-pangolin',
  templateUrl: './one-pangolin.component.html',
  styleUrls: ['./one-pangolin.component.css'],
})
export class OnePangolinComponent implements OnInit {
  OnePangolin$!: Observable<pangolin>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pangolinService: PangolinService,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.AuthService.isAuthenticated) {
      this.router.navigate(['/signin']);
    }
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.OnePangolin$ = this.pangolinService.getPangolinById(id);
  }
  addFriend() {
    console.log('Success! friend added!');
    window.alert('Success! friend added!');
  }

  deleteFriend() {
    console.log('Success! deleted friend!');
    window.alert('Success! deleted friend!');
  }
}
