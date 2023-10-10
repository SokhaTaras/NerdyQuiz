import { Component, Input } from '@angular/core';

import { ModalRefFacadeService } from '@a-shared/services/modal-ref-facade/modal-ref-facade.service';

@Component({
  selector: 'quiz-app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  providers: [ModalRefFacadeService]
})
export class ConfirmModalComponent {
  @Input() text: string;
  @Input() primaryButtonText: string;

  constructor(private modalRefFacadeService: ModalRefFacadeService) {}

  close(isConfirm: boolean): void {
    this.modalRefFacadeService.close(isConfirm);
  }
}
