import { Component, OnInit } from '@angular/core';
import { QuizStateService } from '../../services/quiz-state/quiz-state.service';
import { Quiz } from '../../interfaces/quiz.interface';
import { StorageKey } from '../../enums/storageKey';
import { ModalService } from '../../services/modal/modal.service';
import { InitQuizModalComponent } from '../init-quiz-modal/init-quiz-modal.component';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  keyForQuizzes: string = StorageKey.QUIZZES;
  allQuizzes: Quiz[] | undefined = [];
  constructor(
    private quizService: QuizStateService,
    private modalService: ModalService,
  ) {}
  ngOnInit() {
    this.allQuizzes = this.quizService.getAllQuizzes(this.keyForQuizzes);
  }
  openInitPopUp(): void {
    this.modalService.showModal(InitQuizModalComponent);
  }
}
