import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { PlaceHolder } from '../../../shared/enums/placeHolder';
import { MultipleQuestionForm } from '../../../shared/interfaces/forms.interface';
import { DifficultyList, TypeList } from '../../constants/dropdonws';
import { AnswersFormType } from '../../../shared/types/forms.type ts';
import { maxQuestions } from '../../constants/max-questions';

@Component({
  selector: 'quiz-app-multiple-question',
  templateUrl: './multiple-question.component.html'
})
export class MultipleQuestionComponent implements OnInit {
  protected readonly PlaceHolder = PlaceHolder;
  protected readonly difficultyList = DifficultyList;
  protected readonly typeList = TypeList;
  protected readonly maxQuestionsAmount = maxQuestions;

  multipleQuestionForm: FormGroup<MultipleQuestionForm>;

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
    return formArray.controls as AnswersFormType[];
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  addAnswer(): void {
    const answer: AnswersFormType = this.generateNewAnswer('', false);
    this.answersControl.push(answer);
    this.initCheckboxes();
  }

  initCheckboxes(): void {
    this.answersFormArray.controls.forEach((control, index) => {
      control.valueChanges.subscribe((checked) => {
        if (checked.isCorrect) {
          this.answersFormArray.controls.forEach((otherControl, otherIndex) => {
            if (otherIndex !== index) {
              otherControl.get('isCorrect')?.setValue(false);
            }
          });
        }
      });
    });
  }

  private initForm(): void {
    this.multipleQuestionForm = this.fb.group<MultipleQuestionForm>({
      title: new FormControl('', [Validators.required]),
      type: new FormControl(this.typeList['multiple'][0].text, [
        Validators.required
      ]),
      difficulty: new FormControl(this.difficultyList['easy'][0].text, [
        Validators.required
      ]),
      answers: this.fb.array(
        [this.generateNewAnswer('', true), this.generateNewAnswer('', false)],
        [Validators.required]
      )
    });
  }

  private generateNewAnswer(text: string, isCorrect: boolean): AnswersFormType {
    return this.fb.group({
      text: new FormControl(text),
      isCorrect: new FormControl(isCorrect)
    });
  }
}
