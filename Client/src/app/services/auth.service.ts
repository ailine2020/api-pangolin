import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pangolin } from '../models/pangolin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8888/auth';
  constructor(private http: HttpClient) {}

  signup(pangolin: pangolin) {
    return this.http.post<pangolin>(`${this.baseUrl}/signup`, pangolin);
  }
  signin(pangolin: any) {
    return this.http.post<pangolin>(`${this.baseUrl}/signin`, pangolin);
  }
  signout() {
    return this.http.get(`${this.baseUrl}/signout`);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
