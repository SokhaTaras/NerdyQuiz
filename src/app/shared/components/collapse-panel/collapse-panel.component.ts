import { Component } from '@angular/core';
import { DIVIDER } from '@a-shared/enums/shared-components';

@Component({
  selector: 'quiz-app-collapse-panel',
  templateUrl: './collapse-panel.component.html'
})
export class CollapsePanelComponent {
  readonly DIVIDER = DIVIDER;
}
