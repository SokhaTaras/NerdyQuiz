import { Component, Input, OnInit } from '@angular/core';

import { CORRECTNESS } from '@a-shared/enums/shared-components';
import { SVG_TYPE } from '@a-shared/enums/svg';
import { CorrectnessIndicatorInfo } from '@a-shared/types/correctness-indicator-info';

@Component({
  selector: 'quiz-app-correctness-indicator',
  templateUrl: './correctness-indicator.component.html'
})
export class CorrectnessIndicatorComponent implements OnInit {
  @Input() indicatorInfo: CorrectnessIndicatorInfo;

  readonly SVG_TYPE = SVG_TYPE;

  dynamicClass: string;

  ngOnInit(): void {
    this.setType();
  }

  setType(): void {
    switch (this.indicatorInfo.correctness) {
      case CORRECTNESS.CORRECT:
        this.dynamicClass = 'bg-green-200 ';
        break;
      case CORRECTNESS.WRONG:
        this.dynamicClass = 'bg-red-200';
        break;
      default:
        this.dynamicClass = 'bg-primary';
    }
  }
}
