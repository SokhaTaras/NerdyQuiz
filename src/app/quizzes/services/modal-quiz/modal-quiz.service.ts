import { Injectable } from '@angular/core';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { CreateQuizModalComponent } from '../../components/create-quiz-modal/create-quiz-modal.component';
import { ModalInputDataInterface } from '../../../shared/interfaces/modalInputData.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalQuizService {
  constructor(private modalService: ModalService) {}

  showInitQuizModal(data: ModalInputDataInterface): void {
    this.modalService.showModal(CreateQuizModalComponent, data);
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
