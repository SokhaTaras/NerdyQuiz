import { Component, Input } from '@angular/core';
import { DIVIDER } from '@a-shared/enums/shared-components';

@Component({
  selector: 'quiz-app-divider',
  templateUrl: './divider.component.html'
})
export class DividerComponent {
  @Input() type: DIVIDER;
}
