// edit-profile.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class EditProfileComponent {
  activeTab: string = 'account';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSubmit() {
    // Handle form submission
    console.log('Profile updated');
  }
}