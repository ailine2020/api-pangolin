import { Component, OnInit } from '@angular/core';
import { PangolinService } from '../services/pangolin.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { pangolin } from '../models/pangolin';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css'],
})
export class MyFriendsComponent implements OnInit {
  friendsPangolin$!: Observable<pangolin[]>;
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
    this.currentId = localStorage.getItem('pangolin');
    this.currentId = JSON.parse(this.currentId).pangolin._id;
    console.log('current ID ====>', this.currentId);
    this.friendsPangolin$ = this.pangolinService.getPangolinByToken(this.currentId);
  }
}
