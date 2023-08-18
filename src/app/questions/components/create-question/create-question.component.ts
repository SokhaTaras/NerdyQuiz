import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlaceHolder } from '../../../shared/enums/placeHolder';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  BooleanQuestionForm,
  MultipleQuestionForm,
  QuestionForm
} from '../../../shared/interfaces/forms.interface';
import {
  QuestionBoolean,
  QuestionDifficulty,
  QuestionType
} from '../../interfaces/drowdown.interface';
import {
  BooleanList,
  DifficultyList,
  TypeList
} from '../../constants/dropdonws';
import { Question, wrongAnswers } from '../../interfaces/question.interface';
import { QuestionsService } from '../../services/questions/questions.service';

@Component({
  selector: 'quiz-app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  @Output() displayFalse: EventEmitter<void> = new EventEmitter();

  difficultyList: QuestionDifficulty[] = DifficultyList;
  typeList: QuestionType[] = TypeList;
  booleanList: QuestionBoolean[] = BooleanList;
  isBoolean: boolean | undefined;

  public questionForm!: FormGroup<QuestionForm>;
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

  get correctBooleanAnswer() {
    return this.questionForm.controls.correctBooleanAnswer;
  }

  get booleanVariantsGroup() {
    return this.questionForm.controls.booleanVariants;
  }

  get multipleVariantsGroup() {
    return this.questionForm.controls.multipleVariants;
  }

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService
  ) {}

  ngOnInit() {
    this.initForm();
    this.updateIsBoolean();
  }

  initForm() {
    this.questionForm = this.fb.nonNullable.group<QuestionForm>({
      title: new FormControl('', [Validators.required]),
      type: new FormControl(this.typeList[1].nameEn, [Validators.required]),
      difficulty: new FormControl(this.difficultyList[0].nameEn, [
        Validators.required
      ]),
      correctAnswer: new FormControl('', [Validators.required]),
      correctBooleanAnswer: new FormControl(true, [Validators.required]),

      booleanVariants: new FormGroup<BooleanQuestionForm>({
        variant1: new FormControl(true),
        variant2: new FormControl(false)
      }),

      multipleVariants: new FormGroup<MultipleQuestionForm>({
        variant1: new FormControl(''),
        variant2: new FormControl(''),
        variant3: new FormControl('')
      })
    });
  }

  updateIsBoolean(): void {
    this.questionForm.controls?.type.valueChanges.subscribe((selectedType) => {
      const booleanType = this.typeList[0].nameEn;
      this.isBoolean = selectedType === booleanType;
    });
  }

  saveQuestion(): void {
    this.displayFalse.emit();
    this.formQuestionToObject();
  }

  formQuestionToObject(): Question {
    const questionId: string = this.questionService.geNewQuestionId();
    const question: Question = {
      title: this.questionForm.controls.title.value as string,
      correctAnswer: this.questionForm.controls.correctAnswer.value as string,
      correctBooleanAnswer: this.questionForm.controls.correctBooleanAnswer
        .value as boolean,
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
