import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';


@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [DemoFlexyModule, MatTabsModule, NgFor, NgIf, AsyncPipe],
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.scss']
})
export class MycoursesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
