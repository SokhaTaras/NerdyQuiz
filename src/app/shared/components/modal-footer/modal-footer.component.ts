import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quiz-app-modal-footer',
  templateUrl: './modal-footer.component.html'
})
export class ModalFooterComponent {
  @Input() disableButton: boolean;
  @Input() buttonText: string;
  @Input() isSave: boolean;
  @Output() whenConfirm: EventEmitter<void> = new EventEmitter();
  @Output() whenCancel: EventEmitter<void> = new EventEmitter();

  handleSubmit(): void {
    this.whenConfirm.emit();
  }

  handleCancel(): void {
    this.whenCancel.emit();
  }
}
