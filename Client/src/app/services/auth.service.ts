import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pangolin } from '../models/pangolin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  baseUrl = 'http://localhost:8888/auth';
  constructor(private http: HttpClient) {}

  signup(pangolin: pangolin) {
    return this.http.post<pangolin>(`${this.baseUrl}/signup`, pangolin);
  }
  signin(pangolin: pangolin) {
    this.isAuthenticated = true;
    return this.http.post<pangolin>(`${this.baseUrl}/signin`, pangolin);
  }
  signout() {
    this.isAuthenticated = false;
    return this.http.get(`${this.baseUrl}/signout`);
  }
}
