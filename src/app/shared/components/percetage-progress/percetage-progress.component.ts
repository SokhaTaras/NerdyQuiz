import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-app-percetage-progress',
  templateUrl: './percetage-progress.component.html'
})
export class PercetageProgressComponent {
  @Input() width = 0;
}
