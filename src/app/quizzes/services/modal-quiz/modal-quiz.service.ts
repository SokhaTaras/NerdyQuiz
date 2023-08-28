import { Injectable } from '@angular/core';

import { ModalService } from '../../../shared/services/modal/modal.service';
import { CreateQuizModalComponent } from '../../components/create-quiz-modal/create-quiz-modal.component';
import { ModalResponseType } from '../../../shared/types/modalResponse.type';
import { Quiz } from '../../interfaces/quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalQuizService {
  constructor(private modalService: ModalService) {}

  showInitQuizModal(data: any): ModalResponseType<Quiz> {
    return this.modalService.showModal(CreateQuizModalComponent, data);
  }

  confirmDeletionModal(data: any): ModalResponseType<boolean> {
    return this.modalService.showConfirmModal(data);
  }
}
