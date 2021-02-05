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
  pangolin!: pangolin;
  pangolinId!: any;
  currentId: any = '';

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
    this.activatedRoute.params.subscribe((params) => {
      this.pangolinId = params.id;
    });
    this.OnePangolin$ = this.pangolinService.getPangolinById(this.pangolinId);
    this.currentId = localStorage.getItem('pangolin');
    this.currentId = JSON.parse(this.currentId).pangolin._id;
    console.log('current ID ====>', this.currentId);
  }
  addFriend(pangolin: any) {
    this.pangolinService.addFriend(this.currentId, pangolin).subscribe(
      (data: Object) => this.addSuccess(data, pangolin),
      (error) => this.addError(error)
    );
    console.log('current ID ====>', this.currentId);
    console.log('pangolin ID ====>', this.pangolinId);
  }
  addError(error: any) {
    console.error('Error! friend NOT added!');
    window.alert('Error! friend NOT added!');
  }
  addSuccess(data: Object, pangolin: any) {
    console.log('Success! friend added!');
    window.alert('Success! friend added!');
    console.log('add Data ====>', data, pangolin);
  }
  deleteFriend(pangolin: any) {
    console.log('pangolin', this.currentId);
    this.pangolinService.deleteFriend(this.currentId, pangolin).subscribe(
      (data: Object) => this.deleteSuccess(data, pangolin),
      (error) => this.deleteError(error)
    );
    console.log('current ID ====>', this.currentId);
    console.log('pangolin ID ====>', this.pangolinId);
  }
  deleteError(error: any) {
    console.error('Error! NOT deleted friend!');
    window.alert('Error! NOT deleted friend!');
  }
  deleteSuccess(data: Object, pangolin: any) {
    console.log('Success! deleted friend!');
    window.alert('Success! deleted friend!');
    console.log('delete Data ====>', data);
  }
}
