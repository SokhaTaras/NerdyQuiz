import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz-state/quiz.service';
import { Quiz } from '../../interfaces/quiz.interface';
import { StorageKey } from '../../enums/storageKey';
import { ModalFacadeService } from '../../services/modal-facade/modal-facade.service';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  keyForQuizzes: string = StorageKey.QUIZZES;
  allQuizzes: Quiz[] | undefined = [];
  constructor(
    private quizService: QuizService,
    private modalFacadeService: ModalFacadeService,
  ) {}
  ngOnInit() {
    this.allQuizzes = this.quizService.getAllQuizzes(this.keyForQuizzes);
  }
  openInitPopUp(): void {
    this.modalFacadeService.showInitQuizModal();
  }
}
