import { Component, Input } from '@angular/core';

import { PopoverItem } from '@a-shared/types/popover';
import { SVG_TYPE } from '@a-shared/enums/shared-components';

@Component({
  selector: 'quiz-app-popover',
  templateUrl: './popover.component.html'
})
export class PopoverComponent {
  @Input() label: string;
  @Input() options: PopoverItem[];

  readonly SVG_TYPE = SVG_TYPE;
}
