import { Injectable } from '@angular/core';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { CreateQuizModalComponent } from '../../components/create-quiz-modal/create-quiz-modal.component';
import {
  confirmModalInterface,
  ModalDataInterface
} from '../../../shared/interfaces/modalData.interface';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalQuizService {
  constructor(private modalService: ModalService) {}

  showInitQuizModal(data: ModalDataInterface): void {
    this.modalService.showCreateModal(CreateQuizModalComponent, data);
  }

  showConfirmModal(data: confirmModalInterface): void {
    this.modalService.showConfirmModal(ConfirmModalComponent, data);
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
