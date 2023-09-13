import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() isLoading: Boolean;
}
