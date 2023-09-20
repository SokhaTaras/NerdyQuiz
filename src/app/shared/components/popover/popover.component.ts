import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'quiz-app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
  @Input() contentTemplate: string | TemplateRef<void>;
  @Input() label: string;
}
