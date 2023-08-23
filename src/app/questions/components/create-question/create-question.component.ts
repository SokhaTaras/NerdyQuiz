import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { DifficultyList, TypeList } from '../../constants/dropdonws';
import { QuestionForm } from '../../../shared/interfaces/forms.interface';
import { Question } from '../../interfaces/question.interface';
import { Translations } from '../../../shared/types/translations.type';
import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { getNewQuestionId } from '../../../shared/utils/getId';

@Component({
  selector: 'quiz-app-create-question',
  templateUrl: './create-question.component.html'
})
export class CreateQuestionComponent implements OnInit, OnDestroy {
  @Input() quizId: string | null;
  @Input() isBoolean: boolean;
  @Output() displayFalse: EventEmitter<void> = new EventEmitter();

  public questionForm!: FormGroup<QuestionForm>;

  difficultyList: Translations = DifficultyList;
  typeList: Translations = TypeList;

  private typeSubscription: Subscription;

  get title() {
    return this.questionForm.controls.title;
  }

  get difficulty() {
    return this.questionForm.controls.difficulty;
  }

  get type() {
    return this.questionForm.controls.type;
  }
  // get correctAnswer() {
  //   return this.questionForm.controls.multipleVariants.controls.correctAnswer;
  // }
  //
  // get correctBooleanAnswer() {
  //   return this.questionForm.controls.booleanVariants.controls
  //     .correctBooleanAnswer;
  // }
  //
  // get multipleVariantsGroup() {
  //   return this.questionForm.controls.multipleVariants;
  // }
  // get booleanVariantsGroup() {
  //   return this.questionForm.controls.booleanVariants;
  // }

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.updateIsBoolean();
  }

  updateIsBoolean(): void {
    this.typeSubscription =
      this.questionForm.controls?.type.valueChanges.subscribe(
        (selectedType) => {
          const booleanType = this.typeList['boolean'][0].text;
          this.isBoolean = selectedType === booleanType;
          // this.updateValidators();
        }
      );
  }

  // updateValidators(): void {
  //   if (this.isBoolean) {
  //     this.multipleVariantsGroup.controls.correctAnswer.clearValidators();
  //     this.booleanVariantsGroup.controls.correctBooleanAnswer.setValidators([
  //       Validators.required
  //     ]);
  //   } else {
  //     this.booleanVariantsGroup.controls.correctBooleanAnswer.clearValidators();
  //     this.multipleVariantsGroup.controls.correctAnswer.setValidators([
  //       Validators.required
  //     ]);
  //     this.multipleVariantsGroup.controls.variant1.setValidators([
  //       Validators.required
  //     ]);
  //     this.multipleVariantsGroup.controls.variant2.setValidators([
  //       Validators.required
  //     ]);
  //     this.multipleVariantsGroup.controls.variant3.setValidators([
  //       Validators.required
  //     ]);
  //   }
  //
  //   this.multipleVariantsGroup.controls.correctAnswer.updateValueAndValidity();
  //   this.booleanVariantsGroup.controls.correctBooleanAnswer.updateValueAndValidity();
  // }

  saveQuestion(): void {
    this.displayFalse.emit();
    this.quizService.addQuestion(this.quizId, this.formQuestionToObject());
  }

  formQuestionToObject(): Question {
    const questionId: string = getNewQuestionId();
    const question: Question = {
      title: this.questionForm.controls.title.value as string,
      // correctAnswer: this.questionForm.controls.multipleVariants.controls
      //   .correctAnswer.value as string,
      // correctBooleanAnswer: this.questionForm.controls.booleanVariants.controls
      //   .correctBooleanAnswer.value as boolean,
      type: this.questionForm.controls.type.value as string,
      difficulty: this.questionForm.controls.difficulty.value as string,
      id: questionId
    };

    return question;
  }

  cancelQuestion(): void {
    this.displayFalse.emit();
  }

  private initForm() {
    this.questionForm = this.fb.group<QuestionForm>({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      type: new FormControl(this.typeList['multiple'][0].text, [
        Validators.required
      ]),
      difficulty: new FormControl(this.difficultyList['easy'][0].text, [
        Validators.required
      ])

      // booleanVariants: this.fb.group<BooleanQuestionForm>({
      //   correctBooleanAnswer: new FormControl(true),
      //   variant1: new FormControl(true)
      // }),
      //
      // multipleVariants: this.fb.group<MultipleQuestionForm>({
      //   correctAnswer: new FormControl(null),
      //   variant1: new FormControl(''),
      //   variant2: new FormControl(''),
      //   variant3: new FormControl('')
      // })
    });
  }

  ngOnDestroy() {
    this.typeSubscription.unsubscribe();
  }
}
