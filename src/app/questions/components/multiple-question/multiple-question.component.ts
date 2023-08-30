import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { QuestionForm } from '../../../shared/interfaces/forms.interface';
import { DifficultyList, TypeList } from '../../constants/dropdonws';
import { AnswersFormType } from '../../../shared/types/forms.type ts';
import { maxQuestions } from '../../constants/max-questions';

@Component({
  selector: 'quiz-app-multiple-question',
  templateUrl: './multiple-question.component.html'
})
export class MultipleQuestionComponent implements OnInit, OnDestroy {
  @Output() saveMultipleFormEvent: EventEmitter<FormGroup<QuestionForm>> =
    new EventEmitter<FormGroup<QuestionForm>>();

  multipleQuestionForm: FormGroup<QuestionForm>;
  radioButtonsSubscription: Subscription;

  protected readonly PlaceHolder = PlaceHolder;
  protected readonly difficultyList = DifficultyList;
  protected readonly typeList = TypeList;
  protected readonly maxQuestionsAmount = maxQuestions;

  get title(): FormControl {
    return this.multipleQuestionForm.controls.title;
  }

  get type(): FormControl {
    return this.multipleQuestionForm.controls.type;
  }

  get difficulty(): FormControl {
    return this.multipleQuestionForm.controls.difficulty;
  }

  get answerLength(): number {
    return this.multipleQuestionForm.controls.answers.length;
  }

  get answersFormArray(): FormArray {
    return this.multipleQuestionForm.controls.answers;
  }

  get answersControl(): AnswersFormType[] {
    const formArray = this.multipleQuestionForm.controls.answers;
    return formArray.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initRadioButtons();
  }

  addAnswer(): void {
    const answer: AnswersFormType = this.generateNewAnswer('', false);
    this.answersControl.push(answer);
    this.initRadioButtons();
    this.saveMultipleFormEvent.emit(this.multipleQuestionForm);
  }

  private initRadioButtons(): void {
    this.answersFormArray.controls.forEach((control, index) => {
      this.radioButtonsSubscription = control.valueChanges.subscribe(
        (checked) => {
          if (checked.isCorrect) {
            this.answersFormArray.controls.forEach(
              (otherControl, otherIndex) => {
                if (otherIndex !== index) {
                  otherControl.get('isCorrect')?.setValue(false);
                }
              }
            );
          }
        }
      );
    });
  }

  private initForm(): void {
    this.multipleQuestionForm = this.fb.group<QuestionForm>({
      title: this.fb.control('', [Validators.required]),
      type: this.fb.control(this.typeList[0][0].text, [Validators.required]),
      difficulty: this.fb.control(this.difficultyList[0][0].text, [
        Validators.required
      ]),
      answers: this.fb.array(
        [this.generateNewAnswer('', true), this.generateNewAnswer('', false)],
        [Validators.required]
      )
    });

    this.saveMultipleFormEvent.emit(this.multipleQuestionForm);
  }

  private generateNewAnswer(text: string, isCorrect: boolean): AnswersFormType {
    return this.fb.group({
      text: this.fb.control(text, [Validators.required]),
      isCorrect: this.fb.control(isCorrect)
    });
  }

  ngOnDestroy() {
    this.radioButtonsSubscription.unsubscribe();
  }
}
