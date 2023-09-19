import { Injectable } from '@angular/core';

import { ModalService } from '@a-shared/services/modal/modal.service';
import { ModalResponse } from '@a-shared/types/modalResponse';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { CreateQuizModalComponent } from '@a-quizzes/components/create-quiz-modal/create-quiz-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalQuizService {
  constructor(private modalService: ModalService) {}

  showInitQuizModal(data: any): ModalResponse<Quiz> {
    return this.modalService.showModal(CreateQuizModalComponent, data);
  }

  confirmDeletionModal(data: any): ModalResponse<boolean> {
    return this.modalService.showConfirmModal(data);
  }
}
