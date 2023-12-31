import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationRoutes } from '@a-shared/enums/navigationRoutes';

@Injectable({
  providedIn: 'root'
})
export class NavigateToService {
  constructor(private router: Router) {}

  navigateToQuizDetailsPage(quizId: string): void {
    this.router.navigate([
      NavigationRoutes.QUIZ,
      NavigationRoutes.DETAILS,
      `${quizId}`
    ]);
  }

  navigateHome(): void {
    this.router.navigate([NavigationRoutes.HOME]);
  }

  navigatePlay(quizId: string): void {
    this.router.navigate([
      NavigationRoutes.QUIZ,
      NavigationRoutes.PLAY,
      `${quizId}`
    ]);
  }

  navigateResult(quizId: string): void {
    this.router.navigate([
      NavigationRoutes.QUIZ,
      NavigationRoutes.RESULT,
      `${quizId}`
    ]);
  }
}
