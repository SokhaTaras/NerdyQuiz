import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionForm } from '@a-shared/types/forms';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { InfoCardItem } from '@a-shared/classes/info-card-item/info-card-item';
import { ModalRefFacadeService } from '@a-shared/services/modal-ref-facade/modal-ref-facade.service';
import { QUESTION_CREATION_TYPE } from '@a-shared/enums/question-info';
import { PlaceHolder } from '@a-shared/enums/placeHolder';

@Component({
  selector: 'quiz-app-create-question-modal',
  templateUrl: './create-question-modal.component.html',
  providers: [SubscriptionsService, ModalRefFacadeService]
})
export class CreateQuestionModalComponent {
  @Input() quizId: string;
  @Input() label: string;
  @Output() hideCreation: EventEmitter<void> = new EventEmitter();

  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly PlaceHolder = PlaceHolder;

  booleanQuestionForm: FormGroup<QuestionForm>;
  multipleQuestionForm: FormGroup<QuestionForm>;

  isFormInvalid = true;
  isFetch: boolean;
  isCreation: boolean;
  creationModalLabel: string;
  infoCardSetup: InfoCardItem[];
  selectedCard: InfoCardItem;

  get selectedCardValue() {
    return this.selectedCard?.value;
  }

  constructor(
    private subscriptionsService: SubscriptionsService,
    private quizService: QuizService,
    private modalRefFacadeService: ModalRefFacadeService
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

  close(): void {
    this.modalRefFacadeService.close();
  }

  goToQuestionCreation(): void {
    if (this.selectedCardValue === QUESTION_CREATION_TYPE.MANUALLY) {
      this.creationModalLabel = 'CREATE_QUESTION_MODAL_TEXT.MANUAL_ADDING';
      this.isCreation = true;
    } else {
      this.creationModalLabel = 'CREATE_QUESTION_MODAL_TEXT.FETCH';
      this.isCreation = true;
      this.isFetch = true;
    }
  }

  onRadioButtonCheck(item: InfoCardItem) {
    this.selectedCard = item;
  }

  toggleCreation(): void {
    this.isCreation = false;
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
        'CREATE_QUESTION_MODAL_TEXT.FROM_SCRATCH',
        QUESTION_CREATION_TYPE.MANUALLY
      ),
      new InfoCardItem(
        'CREATE_QUESTION_MODAL_TEXT.FROM_API',
        'CREATE_QUESTION_MODAL_TEXT.RANDOM_QUESTION',
        QUESTION_CREATION_TYPE.FETCH
      )
    ];
    this.selectedCard = this.infoCardSetup[0];
  }
}
