import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';

@Component({
  selector: 'quiz-app-modal-footer',
  templateUrl: './modal-footer.component.html'
})
export class ModalFooterComponent {
  @Input() disableButton: any;
  @Output() saveEvent: EventEmitter<void> = new EventEmitter();

  constructor(private modalQuizService: ModalQuizService) {}

  handleSave(): void {
    this.saveEvent.emit();
  }

  handleCancel(): void {
    this.modalQuizService.closeModal();
  }
}
