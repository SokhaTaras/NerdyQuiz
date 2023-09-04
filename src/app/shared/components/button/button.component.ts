import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BUTTON_TYPE } from '../../enums/buttonType';

@Component({
  selector: 'quiz-app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
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
        this.dynamicClass = 'btn-primary';
        break;
      case BUTTON_TYPE.SECONDARY:
        this.dynamicClass = 'btn-secondary';
        break;
      case BUTTON_TYPE.ERROR:
        this.dynamicClass = 'btn-error';
        break;
    }
  }
}
