import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent {
  @Input() isLoading: boolean;
}
