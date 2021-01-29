import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pangolin } from '../models/pangolin';

@Injectable({
  providedIn: 'root',
})
export class PangolinService {
  baseUrl = 'http://localhost:8888/api/pangolin';
  // subscribe: any;

  constructor(private htttpClient: HttpClient) {}

  getPangolin(): Observable<pangolin[]> {
    return this.htttpClient.get<pangolin[]>(`${this.baseUrl}`);
  }
  getPangolinById(id: any): Observable<pangolin> {
    return this.htttpClient.get<pangolin>(`${this.baseUrl}/${id}`);
  }
  updatePangolin(id: string, pangolin: pangolin) {
    return this.htttpClient.patch(`${this.baseUrl}/${id}`, pangolin);
  }
}
