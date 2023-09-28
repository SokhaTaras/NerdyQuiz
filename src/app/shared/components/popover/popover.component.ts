import { Component, Input } from '@angular/core';

import { PopoverItem } from '@a-shared/types/popover';
import { trigger } from '@angular/animations';

@Component({
  selector: 'quiz-app-popover',
  templateUrl: './popover.component.html'
})
export class PopoverComponent {
  @Input() label: string;
  @Input() options: PopoverItem[];
  protected readonly trigger = trigger;
}
