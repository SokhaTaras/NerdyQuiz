import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionForm } from '@a-shared/types/forms';
import { Question, RadioButtonItem } from '@a-questions/interfaces/question';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { InfoCardItem } from '@a-shared/classes/info-card-item/info-card-item';

@Component({
  selector: 'quiz-app-create-question',
  templateUrl: './create-question.component.html',
  providers: [SubscriptionsService]
})
export class CreateQuestionComponent {
  @Input() quizId: string | null;
  @Input() label: string;
  @Input() isBoolean: boolean;
  @Output() hideCreation: EventEmitter<void> = new EventEmitter();

  readonly BUTTON_TYPE = BUTTON_TYPE;

  booleanQuestionForm: FormGroup<QuestionForm>;
  multipleQuestionForm: FormGroup<QuestionForm>;

  isFormInvalid = true;
  infoCardSetup: InfoCardItem[];
  selectedCard: InfoCardItem;

  constructor(
    private subscriptionsService: SubscriptionsService,
    private quizService: QuizService
  ) {
    this.setupInfoCardItems();
  }

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

    this.subscriptionsService.addSubscription(
      this.quizService.addQuestion(this.quizId, question).subscribe()
    );

    this.hideCreation.emit();
  }

  cancelQuestion(): void {
    this.hideCreation.emit();
  }

  onRadioButtonCheck(item: InfoCardItem) {
    this.selectedCard = item;
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

  private setupInfoCardItems(): void {
    this.infoCardSetup = [
      new InfoCardItem(
        'BUTTON.MANUALLY',
        'CREATE_QUESTION_MODAL_TEXT.FROM_SCRATCH'
      ),
      new InfoCardItem(
        'CREATE_QUESTION_MODAL_TEXT.FROM_API',
        'CREATE_QUESTION_MODAL_TEXT.RANDOM_QUESTION'
      )
    ];
    this.selectedCard = this.infoCardSetup[0];
  }
}
