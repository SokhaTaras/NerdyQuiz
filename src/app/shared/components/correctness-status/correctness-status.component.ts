import { Component, Input, OnInit } from '@angular/core';

import { CORRECTNESS } from '@a-shared/enums/shared-components';
import { SVG_TYPE } from '@a-shared/enums/svg';
import { CorrectnessStatusInfo } from '@a-shared/types/correctness-status-info';

@Component({
  selector: 'quiz-app-correctness-status',
  templateUrl: './correctness-status.component.html'
})
export class CorrectnessStatusComponent implements OnInit {
  @Input() indicatorInfo: CorrectnessStatusInfo;

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
