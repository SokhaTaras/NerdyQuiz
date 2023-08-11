import { Component, Input, OnInit } from '@angular/core';
import { IQuiz } from '../../interfaces/quiz.interface';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent implements OnInit {
  @Input() quiz: IQuiz | undefined;

  constructor(
    private router: Router,
    private modalService: ModalService,
  ) {}

  ngOnInit() {}
  selectQuiz() {}
  goToPage() {
    this.router.navigate(['login']);
  }
}
