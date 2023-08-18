import { Component, OnInit } from '@angular/core';
import { PlaceHolder } from '../../../shared/enums/placeHolder';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { QuestionForm } from '../../../shared/interfaces/forms.interface';
import {
  QuestionDifficulty,
  QuestionType
} from '../../interfaces/drowdown.interface';
import { DifficultyList, TypeList } from '../../constants/dropdonws';

@Component({
  selector: 'quiz-app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  public questionForm!: FormGroup<QuestionForm>;
  difficultyList: QuestionDifficulty[] = DifficultyList;
  typeList: QuestionType[] = TypeList;
  protected readonly PlaceHolder = PlaceHolder;

  get title() {
    return this.questionForm.controls.title;
  }

  get difficulty() {
    return this.questionForm.controls.difficulty;
  }

  get type() {
    return this.questionForm.controls.type;
  }
  get correctAnswer() {
    return this.questionForm.controls.correctAnswer;
  }

  get variants() {
    return this.questionForm.controls.variants;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.questionForm = this.fb.nonNullable.group<QuestionForm>({
      title: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      variants: new FormControl([], [Validators.required]),
      difficulty: new FormControl('', [Validators.required]),
      correctAnswer: new FormControl('', [Validators.required])
    });
  }

  fn() {
    console.log('questForm', this.questionForm);
  }
}
