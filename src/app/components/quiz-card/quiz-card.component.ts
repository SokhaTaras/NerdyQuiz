import { Component, Input } from '@angular/core';
import { Quiz } from '../../interfaces/quiz.interface';
import { Router } from '@angular/router';
import { NavigationRoutes } from '../../enums/navigationRoutes';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent {
  @Input() quiz: Quiz | undefined;
  routeNavigateTo: string = NavigationRoutes.LOGIN;
  constructor(private router: Router) {}
  goToPage() {
    this.router.navigate([this.routeNavigateTo]);
  }
}
