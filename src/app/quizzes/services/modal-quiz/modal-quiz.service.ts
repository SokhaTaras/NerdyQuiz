import { Injectable } from '@angular/core';

import { ModalService } from '@a-shared/services/modal/modal.service';
import { ModalResponse } from '@a-shared/types/modalResponse';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { CreateQuizModalComponent } from '@a-quizzes/components/create-quiz-modal/create-quiz-modal.component';
import { CreateQuestionModalComponent } from '@a-questions/components/create-question-modal/create-question-modal.component';
import {
  CreateQuestionModalData,
  CreateQuizModalData
} from '@a-quizzes/interfaces/modal-data';

@Injectable({
  providedIn: 'root'
})
export class ModalQuizService {
  constructor(private modalService: ModalService) {}

  showInitQuizModal(data: CreateQuizModalData): ModalResponse<Quiz> {
    return this.modalService.showModal(CreateQuizModalComponent, data);
  }

  showCreateQuestionModal(data: CreateQuestionModalData): ModalResponse<Quiz> {
    return this.modalService.showModal(CreateQuestionModalComponent, data);
  }

  confirmDeletionModal(data: any): ModalResponse<boolean> {
    return this.modalService.showConfirmModal(data);
  }
}
