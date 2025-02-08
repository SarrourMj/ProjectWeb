import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private scoreSource = new BehaviorSubject<number>(0);
  currentScore = this.scoreSource.asObservable();

  constructor() {}

  updateScore(newScore: number) {
    this.scoreSource.next(newScore);
  }
}