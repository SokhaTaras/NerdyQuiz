import { Injectable } from '@angular/core';

import { ModalService } from '../../../shared/services/modal/modal.service';
import { CreateQuizModalComponent } from '../../components/create-quiz-modal/create-quiz-modal.component';
import { ModalResponseType } from '../../../shared/types/modalResponse.type';

@Injectable({
  providedIn: 'root'
})
export class ModalQuizService {
  constructor(private modalService: ModalService) {}

  showInitQuizModal(data: any): void {
    this.modalService.showModal(CreateQuizModalComponent, data);
  }

  confirmDeletionModal(data: any): ModalResponseType<boolean> {
    return this.modalService.showConfirmModal(data);
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
