import { Component, OnInit } from '@angular/core';
import { CertificatesService } from '../../services/certificate.service';
import { Certificate } from '../../models/certificate.model';
import { HttpErrorResponse } from '@angular/common/http';
import{CommonModule} from '@angular/common';

@Component({
  selector: 'app-mycertificates',
  templateUrl: './mycertificates.component.html',
  styleUrls: ['./mycertificates.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MyCertificatesComponent implements OnInit {
  certificates: Certificate[] = [];
  noCertificates = false; // Flag to show "No Badges" message
  userId = 1; // Replace with actual logged-in user ID

  constructor(private certificatesService: CertificatesService) {}

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates() {
    this.certificatesService.getUserCertificates(this.userId).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.noCertificates = true;
        } else {
          this.certificates = data;
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
