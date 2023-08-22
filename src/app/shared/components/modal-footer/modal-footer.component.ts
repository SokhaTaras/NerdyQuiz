import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ModalQuizService } from '../../../quizzes/services/modal-quiz/modal-quiz.service';

@Component({
  selector: 'quiz-app-modal-footer',
  templateUrl: './modal-footer.component.html'
})
export class ModalFooterComponent {
  @Input() disableButton: boolean;
  @Input() buttonText: string;
  @Input() isSave: boolean;
  @Input() isConfirm: boolean;
  @Output() saveEvent: EventEmitter<void> = new EventEmitter();
  @Output() editEvent: EventEmitter<void> = new EventEmitter();
  @Output() confirmEvent: EventEmitter<void> = new EventEmitter();

  constructor(private modalQuizService: ModalQuizService) {}

  handleSubmit(): void {
    if (this.isSave) {
      this.saveEvent.emit();
    } else if (this.isConfirm) {
      this.confirmEvent.emit();
    } else {
      this.editEvent.emit();
    }
  }

  handleCancel(): void {
    this.modalQuizService.closeModal();
  }
}
