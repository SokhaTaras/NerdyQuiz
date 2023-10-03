import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionForm } from '@a-shared/types/forms';
import { Question } from '@a-questions/interfaces/question';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { StoreService } from '@a-store/services/store.service';
import { AppState } from '@a-store/state/app.state';
import { AddQuestion } from '@a-store/actions/quizz.actions';

@Component({
  selector: 'quiz-app-create-question',
  templateUrl: './create-question.component.html',
  providers: [SubscriptionsService]
})
export class CreateQuestionComponent {
  @Input() quizId: string | null;
  @Input() isBoolean: boolean;
  @Output() hideCreation: EventEmitter<void> = new EventEmitter();

  booleanQuestionForm: FormGroup<QuestionForm>;
  multipleQuestionForm: FormGroup<QuestionForm>;
  isFormInvalid = true;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private store: StoreService<AppState>,
    private subscriptionsService: SubscriptionsService,
    private quizService: QuizService
  ) {}

  getBooleanQuestionForm(event: FormGroup<QuestionForm>): void {
    this.booleanQuestionForm = event;
    this.subscribeOnFormChange(this.booleanQuestionForm);
  }

  getMultipleQuestionForm(event: FormGroup<QuestionForm>): void {
    this.multipleQuestionForm = event;
    this.subscribeOnFormChange(this.multipleQuestionForm);
  }

  saveQuestion(): void {
    const question: Question = this.mapQuestionToObject();
    console.log(question, this.quizId);
    this.store.dispatcher(AddQuestion({ question, quizId: this.quizId }));

    this.hideCreation.emit();
  }

  cancelQuestion(): void {
    this.hideCreation.emit();
  }

  private mapQuestionToObject(): Question {
    const formData = this.getFormData();

    const question: Question = {
      title: formData.title,
      type: formData.type,
      answers: formData.answers
    };

    return question;
  }

  private getFormData(): Question {
    if (this.multipleQuestionForm) {
      return this.multipleQuestionForm.value as Question;
    } else {
      return this.booleanQuestionForm.value as Question;
    }
  }

  private subscribeOnFormChange(formGroup: FormGroup): void {
    this.subscriptionsService.addSubscription(
      formGroup.valueChanges.subscribe(() => {
        this.isFormInvalid = formGroup.invalid;
      })
    );
  }
}
