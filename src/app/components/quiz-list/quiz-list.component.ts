import { Component, OnInit } from '@angular/core';
import { QuizStateService } from '../../services/quiz-state/quiz-state.service';
import { IQuiz } from '../../interfaces/quiz.interface';
import { StorageKey } from '../../enums/StorageKey';
import { ModalService } from '../../services/modal/modal.service';
import { InitQuizModalComponent } from '../init-quiz-modal/init-quiz-modal.component';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  constructor(
    private quizService: QuizStateService,
    private modalService: ModalService,
  ) {}
  ngOnInit(): void {
    this.allQuizzes = this.quizService.getAllQuizzes(this.keyForQuizzes);
  }

  keyForQuizzes: string = StorageKey.quizzes;
  allQuizzes: IQuiz[] | undefined = [];
  openInitPopUp(): void {
    this.modalService.showModal(InitQuizModalComponent);
  }
}
