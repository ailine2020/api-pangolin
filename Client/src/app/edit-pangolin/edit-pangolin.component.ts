import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pangolin } from '../models/pangolin';
import { PangolinService } from '../pangolin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-pangolin',
  templateUrl: './edit-pangolin.component.html',
  styleUrls: ['./edit-pangolin.component.css'],
})
export class EditPangolinComponent implements OnInit {
  pangolinId!: string;
  pangolin!: pangolin;
  editForm = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private pangolinService: PangolinService,
    private activatedRoute: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.AuthService.isAuthenticated) {
      this.router.navigate(['/signin']);
    }
    this.editForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      age: new FormControl(''),
      famille: new FormControl(''),
      nourriture: new FormControl(''),
      race: new FormControl(''),
    });
    this.activatedRoute.params.subscribe((params) => {
      this.pangolinId = params.id;
    });
    this.pangolinService.getPangolinById(this.pangolinId).subscribe(
      (data) => {
        this.pangolin = data;
        console.log(this.pangolin);
      },
      (error) => console.error(error)
    );
  }
  updatePangolin(formDirective: any) {
    console.log(this.pangolin);
    const editedPangolin = this.pangolin;
    this.pangolinService
      .updatePangolin(this.pangolinId, editedPangolin)
      .subscribe(
        (data: Object) => this.editSuccess(data, formDirective),
        (error: any) => this.editError(error)
      );
  }
  editSuccess(data: Object, formDirective: FormGroupDirective) {
    console.log('OK ! Pangolin updated', data);
    window.alert('Success! Pangolin updated');
    this.pangolinService.getPangolinById(this.pangolinId).subscribe(
      (data) => {
        this.pangolin = data;
        console.log(this.pangolin);
      },
      (error) => console.error(error)
    );
  }
  editError(error: any) {
    console.log('Error! Pangolin NOT updated', error);
    window.alert('Error! Pangolin Not updated');
  }
}
