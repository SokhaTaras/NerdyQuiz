import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationRoutes } from '../../enums/navigationRoutes';
import { Quiz } from '../../../quizzes/interfaces/quiz';

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

  navigatePlay(quiz: Quiz): void {
    this.router.navigate([
      NavigationRoutes.QUIZ,
      NavigationRoutes.PLAY,
      `${quiz.id}`
    ]);
  }
}
