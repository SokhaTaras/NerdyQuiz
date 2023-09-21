import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BUTTON_TYPE } from '@a-shared/enums/shared-components';

@Component({
  selector: 'quiz-app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {
  @Input() type: BUTTON_TYPE;
  @Input() isDisabled: boolean;
  @Output() whenClicked: EventEmitter<void> = new EventEmitter();

  dynamicClass: string;

  ngOnInit(): void {
    this.setType();
  }

  emitClick(): void {
    this.whenClicked.emit();
  }

  private setType(): void {
    switch (this.type) {
      case BUTTON_TYPE.PRIMARY:
        this.dynamicClass = 'bg-primary';
        break;
      case BUTTON_TYPE.SECONDARY:
        this.dynamicClass = 'bg-transparent border-2 border-primary';
        break;
      case BUTTON_TYPE.ERROR:
        this.dynamicClass = 'border border-error text-error';
        break;
    }
  }
}
