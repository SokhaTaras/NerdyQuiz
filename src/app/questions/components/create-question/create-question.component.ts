import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionForm } from '../../../shared/interfaces/forms';
import { Question } from '../../interfaces/question';
import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

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

  protected readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private quizService: QuizService,
    private subscriptionsService: SubscriptionsService
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
    this.quizService.addQuestion(this.quizId, question);
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
      difficulty: formData.difficulty,
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
