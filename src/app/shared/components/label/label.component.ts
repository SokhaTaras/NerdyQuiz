import { Component, Input, OnInit } from '@angular/core';
import { LABELS } from '@a-shared/enums/shared-components';

@Component({
  selector: 'quiz-app-label',
  templateUrl: './label.component.html'
})
export class LabelComponent implements OnInit {
  @Input() type: LABELS;

  dynamicClass: string;

  ngOnInit(): void {
    this.setType();
  }

  private setType(): void {
    switch (this.type) {
      case LABELS.GREEN:
        this.dynamicClass = 'bg-green-50 text-green-700';
        break;
      case LABELS.YELLOW:
        this.dynamicClass = 'bg-amber-50 text-amber-700';
        break;
      case LABELS.RED:
        this.dynamicClass = 'bg-red-50 text-red-700';
        break;
    }
  }
}
