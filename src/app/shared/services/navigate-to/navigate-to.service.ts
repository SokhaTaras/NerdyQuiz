import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavigationRoutes } from '../../enums/navigationRoutes';

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

  navigateIntermediate(quizId: string): void {
    this.router.navigate([
      NavigationRoutes.QUIZ,
      NavigationRoutes.PLAY,
      `${quizId}`
    ]);
  }
}
