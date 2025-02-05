import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SignupData {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:3000/user/signup';

  constructor(private http: HttpClient) {}

  signup(userData: SignupData): Observable<any> {
    console.log("Envoi des données:", userData);
    return this.http.post(this.apiUrl, userData);
  }
}
