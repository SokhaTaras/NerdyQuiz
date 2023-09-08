import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { StorageKey } from '../../../shared/enums/storageKey';
import { Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'quiz-app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnDestroy, OnInit {
  allQuizzes: Quiz[];

  modalSubscription: Subscription;
  initQuizSubscription: Subscription;
  isLoading: boolean;

  protected readonly BUTTON_TYPE = BUTTON_TYPE;

  ngOnInit(): void {
    this.initQuizzes();
  }

  constructor(
    private quizService: QuizService,
    private modalQuizService: ModalQuizService,
    private navigateTo: NavigateToService
  ) {}

  openInitPopUp(): void {
    const data: any = {
      label: 'BUTTON.CREATE_QUIZ',
      buttonText: 'BUTTON.SAVE'
    };
    this.modalSubscription = this.modalQuizService
      .showInitQuizModal(data)
      .onClose.subscribe((quiz) => {
        if (quiz) {
          this.navigateTo.navigateToQuizDetailsPage(quiz.id);
        }
      });
  }

  initQuizzes(): void {
    this.isLoading = true;
    this.initQuizSubscription = this.quizService
      .initAllQuizzes(StorageKey.QUIZZES)
      .subscribe((quizzes): Quiz[] => {
        this.isLoading = false;
        console.log('init quizzes: ', quizzes);
        return (this.allQuizzes = quizzes);
      });
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
    this.initQuizSubscription.unsubscribe();
  }
}
