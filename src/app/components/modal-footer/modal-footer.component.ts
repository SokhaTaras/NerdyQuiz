import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';

@Component({
  selector: 'quiz-app-modal-footer',
  templateUrl: './modal-footer.component.html',
})
export class ModalFooterComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Output() saveEvent = new EventEmitter();

  constructor(private modalQuizService: ModalQuizService) {}

  hasFormErrors(form: FormGroup): boolean {
    return form.invalid;
  }

  handleSave(): void {
    this.saveEvent.emit();
  }

  handleCancel(): void {
    this.modalQuizService.closeModal();
  }
}
