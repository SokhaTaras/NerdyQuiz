import { Component, Input, OnChanges } from '@angular/core';
import { LABELS } from '@a-shared/enums/shared-components';

@Component({
  selector: 'quiz-app-label',
  templateUrl: './label.component.html'
})
export class LabelComponent implements OnChanges {
  @Input() type: LABELS;

  dynamicClass: string;

  ngOnChanges(): void {
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
