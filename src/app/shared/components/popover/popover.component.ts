import { Component, Input } from '@angular/core';

import { Popover } from '@a-shared/types/popover';

@Component({
  selector: 'quiz-app-popover',
  templateUrl: './popover.component.html'
})
export class PopoverComponent {
  @Input() label: string;
  @Input() options: Popover;
}
