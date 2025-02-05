import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router , ActivatedRoute} from '@angular/router';

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
      quote: "I love the flexibility of CourseQuest’s platform and the guidance on what content to study. I had no idea React Native was in such high demand... thanks to Manara I now have my dream remote job!",
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
      quote: "Really appreciated how the AWS cloud training with CourseQuest was customized to my level. I never had exposure to AWS because it wasn’t available in Saudi Arabia before, now I feel really confident using it in my job.",
      photo: 'assets/mo.jpg'
    }
  ];

  team = [
    {
      name: 'Mehdi Ben Rjab',
      role: 'FOUNDER',
      photo: 'assets/images/mehdi.jpg',
      facebook: 'https://www.facebook.com/LUNIX7'
    },
    {
      name: 'youssef Sahnoun',
      role: 'DEVELOPER',
      photo: 'assets//images/sahnoun.jpg',
      facebook: 'https://www.facebook.com/youssef.sahnoun.37'
    },
    {
      name: 'Ameni Kardous',
      role: 'DESIGNER',
      photo: 'assets//images/ameni.jpg',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://www.facebook.com/amani.kardous.5/'
    },
    {
      name: 'youssef Bouden',
      role: 'DEVELOPER',
      photo: 'assets/images/bouden.jpg',
      facebook: 'https://www.facebook.com/boudeeennnn'
    },
    {
      name: 'Sarra Mejdi',
      role: 'DEVELOPER',
      photo: 'assets/images/sarra.jpg',
      facebook: 'https://www.facebook.com/profile.php?id=100007694657173'
    },
    {
      name: 'Zied Ben Bahri',
      role: 'DEVELOPER',
      photo: 'assets/images/zied.jpg',
      facebook: 'https://www.facebook.com/ziedbenbahri02'
    },
  ];


  constructor(private router: Router) { }
goToLogin(): void {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    // Check for fragment on initial load
    this.checkAndScrollToAboutUs();
    this.checkAndScrollToLearnSection();
  }

  checkAndScrollToAboutUs(): void {
    const fragment = window.location.hash.substring(1);
    if (fragment === 'aboutUs') {
      this.scrollToAboutUs();
    }
  }

  scrollToAboutUs(): void {
    const element = document.getElementById('aboutUs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  

  // Add this method to handle "About Us" navigation
  navigateToAboutUs(): void {
    this.router.navigate(['/home'], { fragment: 'aboutUs' });
    this.scrollToAboutUs();
  }
  checkAndScrollToLearnSection(): void {
    const fragment = window.location.hash.substring(1);
    if (fragment === 'learn') {
      this.scrollToLearnSection();
    }
  }
 
  scrollToLearnSection(): void {
    const element = document.getElementById('learnSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
 
  // Add this method to handle "Learn" navigation
  navigateToLearnSection(): void {
    this.router.navigate(['/home'], { fragment: 'learn' });
    this.scrollToLearnSection();
  }
}
