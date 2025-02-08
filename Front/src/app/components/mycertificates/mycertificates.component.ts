import { Component, OnInit } from '@angular/core';
import { CertificatesService } from '../../services/certificate.service';
import { Certificate } from '../../models/certificate.model';
import { HttpErrorResponse } from '@angular/common/http';
import{CommonModule} from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mycertificates',
  templateUrl: './mycertificates.component.html',
  styleUrls: ['./mycertificates.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MyCertificatesComponent implements OnInit {
  userId: number | null = null; // Store user ID
  certificates: Certificate[] = [];
  noCertificates = false; // Flag to show "No Badges" message

  constructor(private certificatesService: CertificatesService,private authService :AuthService ) {}

  ngOnInit(): void {
    const user = this.authService.getUser(); // Get user from AuthService
    if (user && user.id) {
      this.userId = user.id;
      this.loadCertificates();
    } else {
      console.error('User not found or not logged in');
    }
  }

  loadCertificates() {
    this.certificatesService.getUserCertificates(this.userId!).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.noCertificates = true;
        } else {
          this.certificates = data;
          console.log(this.certificates);

        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.noCertificates = true; // Show message if API returns 404
        }
      }
    });
  }
}
