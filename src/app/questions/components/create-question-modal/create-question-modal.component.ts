import { Component, Input } from '@angular/core';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
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
  @Input() label: string;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  isFetch: boolean;
  isLoading: boolean;
  isCreation: boolean;
  creationModalLabel: string;
  infoCardSetup: InfoCardItem[];
  selectedCard: InfoCardItem;
  fetchedQuestion: Question;

  get selectedCardValue() {
    return this.selectedCard?.value;
  }

  get quizId(): string {
    return this.currentQuiz?.id;
  }

  get category(): string {
    return this.currentQuiz?.category.value;
  }

  constructor(
    private modalRefFacadeService: ModalRefFacadeService,
    private quizService: QuizService
  ) {
    this.setupInfoCardItems();
  }

  close(): void {
    this.modalRefFacadeService.close();
  }

  async handleQuestionCreation(): Promise<void> {
    if (this.selectedCardValue === QUESTION_CREATION_TYPE.MANUALLY) {
      this.creationModalLabel = 'CREATE_QUESTION_MODAL_TEXT.MANUAL_ADDING';
      this.isCreation = true;
    } else {
      await this.fetchQuestion();
      this.creationModalLabel = 'CREATE_QUESTION_MODAL_TEXT.FETCH';
      this.isFetch = true;
      this.isCreation = true;
    }
  }

  onRadioButtonCheck(item: InfoCardItem) {
    this.selectedCard = item;
  }

  toggleCreation(): void {
    this.isCreation = false;
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

  //todo is it fine to use promise here?
  private async fetchQuestion(): Promise<void> {
    this.isLoading = true;

    try {
      const question = await this.quizService
        .fetchQuestion(this.category)
        .toPromise();
      this.fetchedQuestion = question;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
