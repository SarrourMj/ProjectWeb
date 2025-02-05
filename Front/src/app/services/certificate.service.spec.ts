import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate } from '../models/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private apiUrl = 'http://localhost:3000/certificates';

  constructor(private http: HttpClient) {}

  getUserCertificates(userId: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.apiUrl}/user/${userId}`);
  }
}
