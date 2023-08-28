import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationRoutes } from '../../enums/navigationRoutes';

@Injectable({
  providedIn: 'root'
})
export class NavigateToService {
  constructor(private router: Router) {}

  navigateToQuizDetailsPage(quizId: string): void {
    this.router.navigate([
      NavigationRoutes.QUIZ,
      `${quizId}`,
      NavigationRoutes.DETAILS
    ]);
  }
}
