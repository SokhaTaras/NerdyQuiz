import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-app-progress-bar',
  templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent {
  @Input() percentageProgress = 0;
}
