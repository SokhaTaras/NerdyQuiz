import { Component, Input } from '@angular/core';

import { POPOVER_TYPE } from '@a-shared/enums/shared-components';
import { PopoverItem } from '@a-shared/types/popover';

@Component({
  selector: 'quiz-app-popover',
  templateUrl: './popover.component.html'
})
export class PopoverComponent {
  @Input() label: string;
  @Input() options: PopoverItem[];
  @Input() type: POPOVER_TYPE;
}
