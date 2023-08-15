import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';

@Component({
  selector: 'quiz-app-modal-footer',
  templateUrl: './modal-footer.component.html'
})
export class ModalFooterComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Output() saveEvent: EventEmitter<any> = new EventEmitter();

  isValid: object | undefined;

  get validForm() {
    return this.form.statusChanges.subscribe((isValid) => isValid);
  }

  constructor(private modalQuizService: ModalQuizService) {}

  ngOnInit() {
    this.isValid = this.validForm;
  }

  handleSave(): void {
    this.saveEvent.emit();
  }

  handleCancel(): void {
    this.modalQuizService.closeModal();
  }
}
