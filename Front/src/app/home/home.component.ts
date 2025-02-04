import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule, 
    
  ]
})
export class HomeComponent implements OnInit {
  testimonials = [
    {
      name: 'Alaa Q.',
      role: 'Mobile Engineer',
      experience: 5,
      quote: "I love the flexibility of Manara’s platform and the guidance on what content to study. I had no idea React Native was in such high demand... thanks to Manara I now have my dream remote job!",
      photo: 'assets/alaa.jpg'
    },
    {
      name: 'Maryam A.',
      role: 'Backend Engineer',
      experience: 2,
      quote: "The course on prompt engineering and AI was great and the support from the community was phenomenal! At the startup I’m at, they expected me to suddenly become an expert in this domain and I felt intimidated asking my questions anywhere else.",
      photo: 'assets/maryam.jpg'
    },
    {
      name: 'Mo B.',
      role: 'DevOps Engineer',
      experience: 3,
      quote: "Really appreciated how the AWS cloud training with Manara was customized to my level. I never had exposure to AWS because it wasn’t available in Saudi Arabia before, now I feel really confident using it in my job.",
      photo: 'assets/mo.jpg'
    }
  ];

  team = [
    {
      name: 'Luna Turner',
      role: 'FOUNDER',
      photo: 'assets/luna.jpg',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    },
    {
      name: 'Bryant Hall',
      role: 'DEVELOPER',
      photo: 'assets/bryant.jpg',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    },
    {
      name: 'Hope Watkins',
      role: 'DESIGNER',
      photo: 'assets/hope.jpg',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    }
  ];


  constructor(private router: Router) { }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    // Initialization logic for HomeComponent
  }
}
