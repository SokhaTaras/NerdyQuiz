import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BUTTON_TYPE } from '@a-shared/enums/shared-components';

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

  readonly BUTTON_TYPE = BUTTON_TYPE;

  handleSubmit(): void {
    this.whenConfirm.emit();
  }

  handleCancel(): void {
    this.whenCancel.emit();
  }
}
