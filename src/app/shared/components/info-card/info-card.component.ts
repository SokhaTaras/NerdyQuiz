import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-app-info-card',
  templateUrl: './info-card.component.html'
})
export class InfoCardComponent {
  @Input() label = '';
  @Input() subLabel = '';
  @Input() containerClass: string;
}
