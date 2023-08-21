import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() quizId: string | undefined = '';

  public questionForm!: FormGroup<QuestionForm>;

  difficultyList: QuestionDifficulty[] = DifficultyList;
  typeList: QuestionType[] = TypeList;
  booleanList: QuestionBoolean[] = BooleanList;
  isBoolean: boolean | undefined;

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

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService
  ) {}

  ngOnInit() {
    this.initForm();
    this.updateIsBoolean();
  }

  initForm() {
    this.questionForm = this.fb.group<QuestionForm>({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      type: new FormControl(this.typeList[1].nameEn, [Validators.required]),
      difficulty: new FormControl(this.difficultyList[0].nameEn, [
        Validators.required
      ]),

      booleanVariants: this.fb.group<BooleanQuestionForm>({
        correctBooleanAnswer: new FormControl(true),
        variant1: new FormControl(true),
        variant2: new FormControl(false)
      }),

      multipleVariants: this.fb.group<MultipleQuestionForm>({
        correctAnswer: new FormControl(''),
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
    this.questionService.addQuestion(this.quizId, this.formQuestionToObject());
  }

  formQuestionToObject(): Question {
    const questionId: string = this.questionService.geNewQuestionId();
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
  fn() {
    console.log('mult', this.questionForm.controls.multipleVariants.invalid);
    console.log('multform', this.questionForm.controls.multipleVariants);
    console.log('boolean', this.questionForm.controls.booleanVariants.invalid);
    console.log('booleanFOrm', this.questionForm.controls.booleanVariants);
    return (
      this.questionForm.controls.booleanVariants.invalid ||
      this.questionForm.controls.multipleVariants.invalid
    );
  }

  cancelQuestion(): void {
    this.displayFalse.emit();
  }
}
