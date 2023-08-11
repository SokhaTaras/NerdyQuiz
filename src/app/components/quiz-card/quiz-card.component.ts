import { Component, Input } from '@angular/core';
import { IQuiz } from '../../interfaces/quiz.interface';
import { Router } from '@angular/router';
import { NavigationRoutes } from '../../enums/routes';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent {
  @Input() quiz: IQuiz | undefined;
  routeNavigateTo: string = NavigationRoutes.LOGIN;

  constructor(private router: Router) {}
  goToPage() {
    this.router.navigate([this.routeNavigateTo]);
  }
}
