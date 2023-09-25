import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() givenWidth = 0;
}
