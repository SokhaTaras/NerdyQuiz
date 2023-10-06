import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { BaseQuizComponent } from '@a-shared/components/base-quiz/base-quiz.component';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import {
  BUTTON_TYPE,
  DIVIDER,
  LABELS
} from '@a-shared/enums/shared-components';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { Quiz, QUIZ_DIFFICULTY } from '@a-quizzes/interfaces/quiz';
import { AppState } from '@a-store/state/app.state';
import { DeleteQuiz, GetQuiz } from '@a-store/actions/quizz.actions';
import { selectSelectedQuiz } from '@a-store/selectors/quiz.selectors';
import { StoreService } from '@a-store/services/store.service';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: 'quiz-details.component.html',
  providers: [SubscriptionsService]
})
export class QuizDetailsComponent extends BaseQuizComponent implements OnInit {
  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly DIVIDER = DIVIDER;
  readonly LABELS = LABELS;

  selectedQuiz$: Observable<Quiz>;

  get quizDifficultyLabel(): LABELS {
    if (this.currentQuiz.difficulty.value === QUIZ_DIFFICULTY.EASY) {
      return LABELS.GREEN;
    } else if (this.currentQuiz.difficulty.value === QUIZ_DIFFICULTY.MEDIUM) {
      return LABELS.YELLOW;
    } else {
      return LABELS.RED;
    }
  }

  constructor(
    quizService: QuizService,
    route: ActivatedRoute,
    navigateTo: NavigateToService,
    subscriptionsService: SubscriptionsService,
    private modalQuizService: ModalQuizService,
    private store: StoreService<AppState>
  ) {
    super(quizService, route, navigateTo, subscriptionsService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.initQuiz();
  }

  openEditPopUp(): void {
    const data: any = {
      label: 'BUTTON.EDIT_QUIZ',
      buttonText: 'BUTTON.EDIT',
      quiz: this.currentQuiz
    };
    this.modalQuizService.showInitQuizModal(data);
  }

  confirmRemoving(): void {
    const data: any = {
      text: 'CONFIRM_MODAL_TEXT.DELETE_QUIZ',
      buttonText: 'BUTTON.CONFIRM'
    };

    this.subscriptionsService.addSubscription(
      this.modalQuizService
        .confirmDeletionModal(data)
        .onClose.subscribe((isConfirm) => {
          if (isConfirm) {
            this.deleteQuiz();
          }
        })
    );
  }

  deleteQuiz(): void {
    this.store.dispatch(DeleteQuiz({ quizToDelete: this.currentQuiz }));
    this.navigateTo.navigateHome();
  }

  private initQuiz(): void {
    this.store.dispatch(GetQuiz({ quizId: this.currentQuiz.id }));
    this.selectedQuiz$ = this.store.select(selectSelectedQuiz);
  }
}
