import { Injectable } from '@angular/core';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { CreateQuizModalComponent } from '../../components/create-quiz-modal/create-quiz-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalQuizService {
  constructor(private modalService: ModalService) {}

  showInitQuizModal(): void {
    this.modalService.showModal(CreateQuizModalComponent);
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
