import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  BooleanList,
  DifficultyList,
  TypeList
} from '../../constants/dropdonws';

import {
  BooleanQuestionForm,
  MultipleQuestionForm,
  QuestionForm
} from '../../../shared/interfaces/forms.interface';
import { Question, wrongAnswers } from '../../interfaces/question.interface';
import { QuestionsService } from '../../services/questions/questions.service';
import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { Translations } from '../../../shared/types/translations.type';

@Component({
  selector: 'quiz-app-create-question',
  templateUrl: './create-question.component.html'
})
export class CreateQuestionComponent implements OnInit {
  @Input() quizId: string = '';
  @Output() displayFalse: EventEmitter<void> = new EventEmitter();

  public questionForm!: FormGroup<QuestionForm>;

  difficultyList: Translations = DifficultyList;
  typeList: Translations = TypeList;
  booleanList: Translations = BooleanList;
  isBoolean: boolean;

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
    return this.questionForm.controls.multipleVariants.controls.correctAnswer;
  }

  get correctBooleanAnswer() {
    return this.questionForm.controls.booleanVariants.controls
      .correctBooleanAnswer;
  }

  get multipleVariantsGroup() {
    return this.questionForm.controls.multipleVariants;
  }
  get booleanVariantsGroup() {
    return this.questionForm.controls.booleanVariants;
  }

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService
  ) {}

  ngOnInit(): void {
    console.log(this.typeList);
    this.initForm();
    this.updateIsBoolean();
  }

  private initForm() {
    this.questionForm = this.fb.group<QuestionForm>({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      type: new FormControl(this.typeList['boolean'][0].text, [
        Validators.required
      ]),
      difficulty: new FormControl(this.difficultyList['easy'][0].text, [
        Validators.required
      ]),

      booleanVariants: this.fb.group<BooleanQuestionForm>({
        correctBooleanAnswer: new FormControl(true),
        variant1: new FormControl(true),
        variant2: new FormControl(false)
      }),

      multipleVariants: this.fb.group<MultipleQuestionForm>({
        correctAnswer: new FormControl(null),
        variant1: new FormControl(''),
        variant2: new FormControl(''),
        variant3: new FormControl('')
      })
    });
  }

  updateIsBoolean(): void {
    this.questionForm.controls?.type.valueChanges.subscribe((selectedType) => {
      const booleanType = this.typeList[0][0].text;
      this.isBoolean = selectedType === booleanType;
      this.updateValidators();
    });
  }

  updateValidators(): void {
    if (this.isBoolean) {
      this.multipleVariantsGroup.controls.correctAnswer.clearValidators();
      this.booleanVariantsGroup.controls.correctBooleanAnswer.setValidators([
        Validators.required
      ]);
    } else {
      this.booleanVariantsGroup.controls.correctBooleanAnswer.clearValidators();
      this.multipleVariantsGroup.controls.correctAnswer.setValidators([
        Validators.required
      ]);
      this.multipleVariantsGroup.controls.variant1.setValidators([
        Validators.required
      ]);
      this.multipleVariantsGroup.controls.variant2.setValidators([
        Validators.required
      ]);
      this.multipleVariantsGroup.controls.variant3.setValidators([
        Validators.required
      ]);
    }

    this.multipleVariantsGroup.controls.correctAnswer.updateValueAndValidity();
    this.booleanVariantsGroup.controls.correctBooleanAnswer.updateValueAndValidity();
  }

  saveQuestion(): void {
    this.displayFalse.emit();
    this.questionService.addQuestion(this.quizId, this.formQuestionToObject());
  }

  formQuestionToObject(): Question {
    const questionId: string = this.questionService.getNewQuestionId();
    const question: Question = {
      title: this.questionForm.controls.title.value as string,
      correctAnswer: this.questionForm.controls.multipleVariants.controls
        .correctAnswer.value as string,
      correctBooleanAnswer: this.questionForm.controls.booleanVariants.controls
        .correctBooleanAnswer.value as boolean,
      wrongAnswers: this.questionForm.controls.multipleVariants
        .value as wrongAnswers,
      type: this.questionForm.controls.type.value as string,
      difficulty: this.questionForm.controls.difficulty.value as string,
      id: questionId
    };

    return question;
  }

  cancelQuestion(): void {
    this.displayFalse.emit();
  }
}
