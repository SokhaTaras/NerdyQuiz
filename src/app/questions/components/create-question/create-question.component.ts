import { Component } from '@angular/core';
import { PlaceHolder } from '../../../shared/enums/placeHolder';

@Component({
  selector: 'quiz-app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent {
  protected readonly PlaceHolder = PlaceHolder;
}
