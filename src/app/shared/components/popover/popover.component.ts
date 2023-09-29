import { Component, Input } from '@angular/core';

import { PopoverItem } from '@a-shared/types/popover';

@Component({
  selector: 'quiz-app-popover',
  templateUrl: './popover.component.html'
})
export class PopoverComponent {
  @Input() label: string;
  @Input() options: PopoverItem[];
}
