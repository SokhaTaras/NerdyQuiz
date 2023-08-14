import { Injectable } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { InitQuizModalComponent } from '../../components/init-quiz-modal/init-quiz-modal.component';
@Injectable({
  providedIn: 'root',
})
export class ModalFacadeService {
  constructor(private modalService: ModalService) {}
  showInitQuizModal(): void {
    this.modalService.showModal(InitQuizModalComponent);
  }
  closeModal(): void {
    this.modalService.closeModal();
  }
}
