import { Component, Input } from '@angular/core';

import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { InfoCardItem } from '@a-shared/classes/info-card-item/info-card-item';
import { ModalRefFacadeService } from '@a-shared/services/modal-ref-facade/modal-ref-facade.service';
import { QUESTION_CREATION_TYPE } from '@a-shared/enums/question-info';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { Question } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-create-question-modal',
  templateUrl: './create-question-modal.component.html',
  providers: [SubscriptionsService, ModalRefFacadeService]
})
export class CreateQuestionModalComponent {
  @Input() currentQuiz: Quiz;
  @Input() question: Question;
  @Input() label: string;
  @Input() isSecondStep: boolean;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  isFetch: boolean;
  isLoading: boolean;
  creationModalLabel: string;
  infoCardSetup: InfoCardItem[];
  selectedCard: InfoCardItem;

  get selectedCardValue() {
    return this.selectedCard?.value;
  }

  get quizId(): string {
    return this.currentQuiz?.id;
  }

  get category(): string {
    return this.currentQuiz?.category.value;
  }

  constructor(private modalRefFacadeService: ModalRefFacadeService) {
    this.setupInfoCardItems();
  }

  close(): void {
    this.modalRefFacadeService.close();
  }

  handleQuestionCreation(): void {
    if (this.selectedCardValue === QUESTION_CREATION_TYPE.MANUALLY) {
      this.creationModalLabel = 'CREATE_QUESTION_MODAL_TEXT.MANUAL_ADDING';
      this.isFetch = false;
      this.isSecondStep = true;
    } else {
      this.creationModalLabel = 'CREATE_QUESTION_MODAL_TEXT.FETCH';
      this.isFetch = true;
      this.isSecondStep = true;
    }
  }

  onRadioButtonCheck(item: InfoCardItem): void {
    this.selectedCard = item;
  }

  showPreViewPage(): void {
    this.isSecondStep = false;
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
