import { Injectable } from '@angular/core';

import { ModalService } from '../../../shared/services/modal/modal.service';
import { CreateQuizModalComponent } from '../../components/create-quiz-modal/create-quiz-modal.component';
import { ModalResponse } from '../../../shared/types/modalResponse';
import { Quiz } from '../../interfaces/quiz';

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
